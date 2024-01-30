/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "./NewCustomerForm.scss";
// import InputComponent from "@/components/InputComponent";

export type AddressType = {
  street: string;
  street_2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

export type SignInForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  lastname: string;
  phone: string;
  birthday: string | Date;
  base_address: AddressType;
};

const formTest = {
  username: "tes3nal",
  email: "fiss3dal@test.com",
  password: "asdf1234",
  confirmPassword: "asdf1234",
  name: "final test",
  lastname: "apeido final",
  phone: "66422443970",
  birthday: "2003-12-12",
  base_address: {
    street: "calle prueba #34",
    street_2: "Residencial aguacaliente",
    city: "tijuana",
    state: "Sonora",
    country: "Argentina",
    zip: "22000",
  },
  users_permissions_user: 61,
};

// Esta funcion registra un CLiente nuevo (Obtiene el Barrer de postNewUser())
async function postNewCustomer(customerData: any, token: any) {
  // console.log("todo bien", token);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token.jwt}`);

  var raw = JSON.stringify({
    data: {
      ...customerData,
      users_permissions_user: token.user.id,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    "http://localhost:1337/api/customers/",
    requestOptions as any
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log("error", error));

  const data = JSON.parse(res as string);
  return { Response, data };
}

export default function NewCustomerForm({ token }: any) {
  const [formData, setFormData] = useState<SignInForm>(formTest);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const jwtToken = token;

    const customerData = {
      name: formData.name,
      lastname: formData.lastname,
      phone: formData.phone,
      birthday: formData.birthday,
      base_address: {
        street: formData.base_address.street,
        street_2: formData.base_address.street_2,
        city: formData.base_address.city,
        state: formData.base_address.state,
        country: formData.base_address.country,
        zip: formData.base_address.zip,
      },
      users_permissions_user: jwtToken.user.id,
    };
    try {
      const customer = await postNewCustomer(customerData, jwtToken);

      // Si el registro es exitoso, redirige a la página de inicio
      if (customer.data) {
        console.log("/");
      } else {
        console.error("Error en el registro:", customer.data);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  const handleChange = (event: any) => {
    const dato = event?.target.value;

    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const handleAddressChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      base_address: {
        ...prevFormData.base_address,
        [name]: value,
      },
    }));
  };

  return (
    <form
      action=""
      className="signInForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      {/* <fieldset title="usuario">
        <h4>Informacion de Contacto</h4>

        <div className="formRow">
          <InputComponent
            name="name"
            label="Nombre Completo"
            type="text"
            value={formData.name}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="lastname"
            label="Apeidos"
            type="text"
            value={formData.lastname}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="phone"
            label="Telefono de Contacto"
            type="tel"
            value={formData.phone}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="birthday"
            label="Telefono de Contacto"
            type="date"
            value={formData.birthday as string}
            inputChange={(event: any) => handleChange(event)}
          />
        </div>
      </fieldset>

      <fieldset title="direccion base">
        <h4>Direccion Base</h4>
        <div className="formRow">
          <InputComponent
            name="street"
            label="Calle y numero"
            type="text"
            value={formData.base_address.street}
            inputChange={(event: any) => handleAddressChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="street_2"
            label="Fraccionamiento / Colonia"
            type="text"
            value={formData.base_address.street_2}
            inputChange={(event: any) => handleAddressChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="city"
            label="Ciudad"
            type="text"
            value={formData.base_address.city}
            inputChange={(event: any) => handleAddressChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="state"
            label="Estado"
            type="text"
            value={formData.base_address.state}
            inputChange={(event: any) => handleAddressChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="country"
            label="Pais"
            type="text"
            value={formData.base_address.country}
            inputChange={(event: any) => handleAddressChange(event)}
          />
        </div>
        <div className="formRow">
          <InputComponent
            name="zip"
            label="Codigo Postal"
            type="text"
            value={formData.base_address.zip}
            inputChange={(event: any) => handleAddressChange(event)}
          />
        </div>
      </fieldset> */}

      <div className="formBtn">
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}
