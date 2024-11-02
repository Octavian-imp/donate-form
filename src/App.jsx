import { sha256 } from "js-sha256"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styles from "./App.module.scss"
import Button from "./components/ui/button"
import Input from "./components/ui/input"
import { DonateConfig } from "./constants"
import accountInfo from "./mock/mockAccountInfo"
import routes from "./routes"

const App = () => {
  const navigate = useNavigate()
  const methods = useForm({ mode: "onTouched" })

  function checkCardNumber(e) {
    if (e.target.value.length > 19) {
      e.target.value = e.target.value.slice(0, 19)
    }
    if (
      e.target.value.length === 4 ||
      e.target.value.length === 9 ||
      e.target.value.length === 14
    ) {
      e.target.value += " "
    }
    e.target.value = e.target.value.replace(/[a-zA-Z]/g, "")
  }

  function checkLunAlgo(value, name) {
    let acc = 0
    let numVal = value.replace(/\s/g, "")
    let str = ""
    for (let i = 0; i < numVal.length; i++) {
      if (i % 2 === 0) {
        const val = +numVal[i] * 2 > 9 ? +numVal[i] * 2 - 9 : +numVal[i] * 2
        str += val
        acc += val
      } else {
        acc += +numVal[i]
        str += numVal[i]
      }
    }

    if (acc % 10 === 0) {
      return true
    }

    return false
  }

  function checkValidityPeriod(e) {
    if (e.target.value.length > 7) {
      e.target.value = e.target.value.slice(0, 7)
    }
    if (e.target.value.length === 2) {
      e.target.value += " / "
    }
    e.target.value = e.target.value.replace(/[a-zA-Z]/g, "")
  }

  function checkCVV(e) {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3)
    }
    e.target.value = e.target.value.replace(/[a-zA-Z]/g, "")
  }

  const onSubmit = (data) => {
    const request = new Promise((res) => {
      const transaction = (Math.random() * 1000).toString(36)
      const bodyQuery = {
        api_key: process.env.api_key,
        transaction: transaction,
        description: data.message,
        amount: +data.amount,
        hash_sum: sha256(
          process.env.api_key +
            transaction +
            +data.amount * 100 +
            accountInfo.secretKey
        ),
        email: accountInfo.email,
        redirect_url: process.env.redirect_url,
        success_redirect: process.env.success_url,
        fail_redirect: process.env.fail_url,
        custom_data: {
          name: DonateConfig.username,
          goal: DonateConfig.goal,
        },
      }
      setTimeout(() => {
        res(bodyQuery)
      }, 100)
    })

    request.then((bodyQuery) => {
      localStorage.setItem("bodyQuery", JSON.stringify(bodyQuery))
      return navigate(routes.prepareQuery)
    })
  }

  return (
    <main className={styles.content}>
      <FormProvider {...methods}>
        <form
          className={styles.form}
          noValidate
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className={styles.form__title}>
            {DonateConfig.username} собирает на "{DonateConfig.goal}"
          </h1>
          <Input
            control={methods.control}
            name="cardNumber"
            label={"Номер карты"}
            rules={{
              required: { value: true, message: "Укажите номер карты" },
              maxLength: {
                value: 19,
                message: "Номер карты должен содержать 16 цифр",
              },
              minLength: {
                value: 19,
                message: "Номер карты должен содержать 16 цифр",
              },
              validate: (value) => {
                if (value.length === 19) {
                  return checkLunAlgo(value, "cardNumber")
                }
                return true
              },
            }}
            defaultValue=""
            onChange={checkCardNumber}
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" &&
                (e.target.value.length === 5 ||
                  e.target.value.length === 10 ||
                  e.target.value.length === 15)
              ) {
                e.target.value = e.target.value.slice(0, -1)
              }
            }}
          />
          <div className="flex items-center gap-9">
            <Input
              control={methods.control}
              name="validityPeriod"
              label={"Срок действия"}
              placeholder="MM / ГГ"
              parentClassName="flex-1"
              defaultValue=""
              rules={{
                required: { value: true, message: "Укажите срок действия" },
                maxLength: {
                  value: 7,
                  message: "Срок действия должен содержать 4 цифры",
                },
                minLength: {
                  value: 7,
                  message: "Срок действия должен содержать 4 цифры",
                },
              }}
              onChange={checkValidityPeriod}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && e.target.value.length === 5) {
                  e.target.value = e.target.value.slice(0, -3)
                }
              }}
            />
            <Input
              control={methods.control}
              name="cvv"
              label={"СVV"}
              defaultValue=""
              parentClassName="flex-1"
              type="password"
              rules={{
                required: { value: true, message: "Укажите CVV" },
                maxLength: {
                  value: 3,
                  message: "CVV должен содержать 3 цифры",
                },
                minLength: {
                  value: 3,
                  message: "CVV должен содержать 3 цифры",
                },
              }}
              onChange={checkCVV}
            />
          </div>
          <Input
            control={methods.control}
            defaultValue=""
            name="amount"
            label={"Сумма перевода"}
            rules={{
              required: { value: true, message: "Укажите сумму перевода" },
              min: {
                value: 10,
                message: "Минимальная сумма перевода 10 рублей",
              },
            }}
            type="text"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "")
            }}
          />
          <Input
            control={methods.control}
            defaultValue=""
            name="name"
            label={"Ваше имя"}
            rules={{ required: { value: true, message: "Укажите ваше имя" } }}
          />
          <Input
            control={methods.control}
            defaultValue=""
            name="message"
            label={"Сообщение получателю"}
            rules={{
              required: { value: true, message: "Укажите сообщение" },
            }}
          />
          <div className="flex gap-4">
            <Button variant="primary" type="submit">
              Перевести
            </Button>
            <Button variant="secondary" type="button">
              Вернуться
            </Button>
          </div>
        </form>
      </FormProvider>
    </main>
  )
}

export default App
