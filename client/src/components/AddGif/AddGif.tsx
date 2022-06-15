import React from "react";
import Input, { InputProps } from "../Input/Input";

interface AddGifForm {
  addressTo: string;
  gifUrl: string;
  amount: number;
}

interface AddGifFormError {
  addressTo: string;
  gifUrl: string;
}

const AddGif: React.FC = (): React.ReactElement => {
  const [addGifForm, setAddGifForm] = React.useState<AddGifForm>({
    addressTo: "",
    gifUrl: "",
    amount: 0.0001,
  });
  const [addGifFormError, setAddGifFormError] = React.useState<AddGifFormError>(
    {
      addressTo: "",
      gifUrl: "",
    }
  );

  const isValidUrl = (url: string): boolean => {
    return (
      (url.startsWith("https://") || url.startsWith("http://")) &&
      url.endsWith(".gif")
    );
  };

  const addGifInputs: InputProps[] = [
    {
      label: "Address to",
      placeholder: "0xasdasd....fhahsd",
      name: "addressTo",
      type: "text",
      value: addGifForm.addressTo,
      onChange: (value: string): void => {
        setAddGifForm({
          ...addGifForm,
          addressTo: value,
        });
        setAddGifFormError({
          ...addGifFormError,
          addressTo: value ? "" : "Address cannot be empty",
        });
      },
      error: addGifFormError.addressTo,
    },
    {
      label: "GIPHY URL",
      placeholder: "https://media.giphy.com/media/xUA7aQOfOFZyC4qvZe/giphy.gif",
      name: "gifUrl",
      type: "text",
      value: addGifForm.gifUrl,
      onChange: (value: string): void => {
        setAddGifForm({
          ...addGifForm,
          gifUrl: value,
        });
        setAddGifFormError({
          ...addGifFormError,
          gifUrl: value
            ? isValidUrl(value)
              ? ""
              : "Invalid URL"
            : "GIF URL cannot be empty",
        });
      },
      error: addGifFormError.gifUrl,
    },
    {
      label: "Amount (ETH)",
      placeholder: "0.0001",
      name: "amount",
      type: "number",
      value: addGifForm.amount,
      onChange: (value: string): void => {
        setAddGifForm({
          ...addGifForm,
          amount: Number(value),
        });
      },
      step: 0.0001,
      description:
        "The higher the amount, the initial votes for your GIF will be higher! (0.0001 ETH = 1 vote)",
    },
  ];

  const addGif = (): void => {
    setAddGifFormError({
      addressTo: addGifForm.addressTo ? "" : "Address cannot be empty",
      gifUrl: addGifForm.gifUrl ? "" : "GIF URL cannot be empty",
    });
    if (
      addGifForm.addressTo &&
      addGifForm.gifUrl &&
      !addGifFormError.addressTo &&
      !addGifFormError.gifUrl
    ) {
      console.log(addGifForm);
    }
  };

  return (
    <div className="w-full pt-6 sm:pt-0">
      <div className="text-white pb-3 text-center sm:text-left">
        Curious to see how popular your favourite GIPHY is around the world? Add
        them here!
      </div>
      {addGifInputs.map(
        (input: InputProps, index: number): React.ReactElement => {
          return (
            <Input
              key={index}
              label={input.label}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              value={input.value}
              onChange={input.onChange}
              step={input.step}
              description={input.description}
              error={input.error}
            />
          );
        }
      )}
      <div className="flex justify-end">
        <button
          className="px-6 py-1 mt-2 uppercase font-semibold tracking-wider border-2 border-teal-400 text-teal-400"
          type="submit"
          onClick={addGif}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddGif;
