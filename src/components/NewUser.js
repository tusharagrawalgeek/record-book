import React, { useEffect } from "react";
import "../style.css";
import { useForm, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import checkUsername from "../api/checkUsername";
import addUser from "../api/addUser";
export const NewUser = (props) => {
  const form = useForm({
    defaultValues: {
      username: "Batman",
      email: "abc@gmail.com",
      password: "",
      phoneNumbers: ["", ""],
      age: 0,
      dob: new Date(),
    },
    mode: "onTouched",
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;
  const { errors, isValid, isDirty, isSubmitSuccessful, isSubmitting } =
    formState;
  const watchData = watch(["username", "email"]);
  async function onSubmit() {
    console.log("suvmit clicked");
    const data = getValues();
    const newUser = {
      username: data.username.toLowerCase(),
      email: data.email,
      phone: data.phoneNumbers[0],
      age: data.age,
      password: data.password,
    };
    await addUser(newUser)
      .then(res=>console.log(res.data))
      .catch(console.log)

    // }
  }
  function onError(errs) {
    console.log(errs);
  }
  function handleGetValues() {
    console.log(getValues());
  }
  function handleSetValue() {
    setValue("username", "Superman", { shouldValidate: "true" });
    setValue("email", "abdcdac@gmil.com", { shouldValidate: "true" });
    setValue("channel", "abcd ", { shouldValidate: "true" });
    setValue("phoneNumbers[0]", 8941055198, { shouldValidate: "true" });
    setValue("age", 20, { shouldValidate: "true" });
    setValue("dob", "2023-09-20", { shouldValidate: "true" });
  }
  function handleReset() {
    reset();
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  // useEffect(()=>{
  //   if(isSubmitting){

  //   }
  // })
  //   const { name, ref, onChange, onBlur } = register("username");
  return (
    <div style={{ width: "fit-content", margin: "auto" }}>
      {/* {console.log(form)} */}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        autoComplete="new-password"
      >
        <h2>ADD NEW USER</h2>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "This field is required",
              validate: {
                validUsername: async (value) => {
                  const result = await checkUsername(value.toLowerCase());
                  console.log(result.data.length);
                  return result.data.length === 0 || "Username already exists";
                },
              },
            })}
          ></input>

          <div className="error">{errors.username?.message}</div>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid format",
              },
              validate: (value) => {
                return value !== "admin@gmail.com" || "Enter different mail";
              },
            })}
          ></input>

          <div className="error">{errors.email?.message}</div>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <br />
          <input
            style={{ width: "90%", padding: "10px 20px" }}
            type="password"
            id="password"
            {...register("password", {
              required: "This field is required",
            })}
          ></input>
          <div className="error">{errors.password?.message}</div>
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone No.</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers[0]", {
              required: "This field is required",
              maxLength: {
                value: 10,
                message: "Phone number must be 10 digits long",
              },
              minLength: {
                value: 10,
                message: "Phone number must be 10 digits long",
              },
            })}
          ></input>
          <div className="error">{errors.phoneNumbers?.[0]?.message}</div>
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone No.</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers[1]", {
              maxLength: {
                value: 10,
                message: "Phone number must be 10 digits long",
              },
              minLength: {
                value: 10,
                message: "Phone number must be 10 digits long",
              },
            })}
          ></input>
          <div className="error">{errors.phoneNumbers?.[1]?.message}</div>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "This field is required",
              min: {
                value: 18,
                message: "Age can not be less than 18",
              },
              max: {
                value: 100,
                message: "Age can not be more than 80",
              },
            })}
          ></input>
          <div className="error">{errors.age?.message}</div>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <br />
          <input
            type="date"
            id="dob"
            {...register("dob", {
              // valueAsDate:true,
              required: "This field is required",
            })}
          ></input>
          <div className="error">{errors.dob?.message}</div>
        </div>
        <button disabled={isSubmitting}>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get Field Values{" "}
        </button>
        <button type="button" onClick={handleSetValue}>
          Set username{" "}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        
      </form>
      <button onClick={()=>props.cancelForm()}>Cancel</button>
      <DevTool control={control} />
    </div>
  );
};
export default NewUser;
