// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

export function App() {
  const [password, setPassword] = useState('123');
  const [passwordRepeat, setPasswordRepeat] = useState('1234');
  const [formValidation, setFormValidation] = useState({minLength: false, minNumber: false, passwordMatch: false, formValid: false});

  const passwordOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const passwordRepeatOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPasswordRepeat(event.target.value);
  const formOnSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValidation.formValid) {
      // lets continue...
      console.log('formIsValid');
    } else {
      console.log('formIsInValid');
    }
  }

  // check form validity if some control changes
  useEffect(() => {
    const passwordMatch = password === passwordRepeat;
    const minLength = password.length >= 6;
    const minNumber = /(?=(?:\D*\d){1,})/.test(password);
    setFormValidation((prevState) => {
      const newFormState = {...prevState, passwordMatch, minLength, minNumber};
      return {...newFormState, formValid: minLength && minNumber && passwordMatch };
    });
  }, [password, passwordRepeat])

  return (
    <>
      <div>Your password must:</div>
      <div className={`${styles["message"]} ${!formValidation.minLength && styles["invalid"]}`}>- Have at least 6
        characters
      </div>
      <div className={`${styles["message"]} ${!formValidation.minNumber && styles["invalid"]}`}>- Have at least 1
        number
      </div>
      <div className={`${styles["message"]} ${!formValidation.passwordMatch && styles["invalid"]}`}>- Password match
      </div>

      <form onSubmit={formOnSubmitHandler}>
        <div className={styles['form-control']}>
          <input type="password" onChange={passwordOnChangeHandler} value={password}/>
        </div>

        <div className="form-control">
          <input type="password" onChange={passwordRepeatOnChangeHandler} value={passwordRepeat}/>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
