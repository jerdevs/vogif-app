import React from "react";
import { SubmitGifState } from "../../providers/TransactionProvider.interfaces";
import Input, { InputProps } from "../Input/Input";

export interface AddGifForm {
  addressTo: string;
  gifUrl: string;
  amount: number;
}

interface AddGifFormError {
  gifUrl: string;
}

interface AddGifProps {
  submitGif: SubmitGifState;
  submitAddGif?: (data: AddGifForm) => void;
}

const AddGif: React.FC<AddGifProps> = (
  props: AddGifProps
): React.ReactElement => {
  const { submitGif, submitAddGif } = props;

  const initialAddGifFormData: AddGifForm = {
    addressTo: process.env.REACT_APP_METAMASK_ACCOUNT || "",
    gifUrl: "",
    amount: 0.0001,
  };

  const [addGifForm, setAddGifForm] = React.useState<AddGifForm>(
    initialAddGifFormData
  );
  const [addGifFormError, setAddGifFormError] = React.useState<AddGifFormError>(
    {
      gifUrl: "",
    }
  );

  React.useEffect((): void => {
    if (submitGif.success || submitGif.error) {
      setAddGifForm(initialAddGifFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitGif]);

  const isValidUrl = (url: string): boolean => {
    return (
      (url.startsWith("https://") || url.startsWith("http://")) &&
      url.endsWith(".gif")
    );
  };

  const checkInvalidUrl = (url: string): string => {
    return isValidUrl(url) ? "" : "Invalid URL";
  };
  const addGifInputs: InputProps[] = [
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
          gifUrl: value ? checkInvalidUrl(value) : "GIF URL cannot be empty",
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

  const addGif = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAddGifFormError({
      gifUrl: addGifForm.gifUrl ? "" : "GIF URL cannot be empty",
    });
    if (addGifForm.addressTo && addGifForm.gifUrl && !addGifFormError.gifUrl) {
      e.preventDefault();
      submitAddGif && submitAddGif(addGifForm);
    }
  };

  return (
    <div className="w-full pt-6 sm:pt-0">
      <div className="pb-6 text-center lg:text-left text-sm sm:text-base">
        <div className="text-white pb-4">
          Curious to see how popular your favourite GIF is around the world? Add
          them here!
        </div>
        <div className="text-white">
          You can choose from a variety of GIFs{" "}
          <a
            className="underline underline-offset-4 hover:text-teal-400"
            href="https://giphy.com/"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          ! 🤩
        </div>
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
              disabled={submitGif.loading}
            />
          );
        }
      )}
      <div
        className={`flex ${
          submitGif.error || submitGif.success
            ? "justify-between"
            : "justify-end"
        } items-center mt-2`}
      >
        {submitGif.error && (
          <div className="text-red-300 text-sm">
            Transaction error, please try again later.
          </div>
        )}
        {submitGif.success && (
          <div className="text-teal-400 text-sm">
            Your GIF has been uploaded successfully!
          </div>
        )}
        <button
          className="px-6 py-1 text-sm sm:text-base uppercase font-semibold tracking-wider border-2 border-teal-400 text-teal-400"
          type="submit"
          onClick={addGif}
          disabled={submitGif.loading}
        >
          {submitGif.loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddGif;
