import React from "react";
import FormHookField from "../../components/FormHookField/FormHookField";
import Button from "../../components/Button/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import {
  StyledDiv,
  FormContainer,
  MarginDiv,
} from "../GistForm/GistForm.styles";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useCreateGist, useEditGist } from "../../utils/useCreateGist";

export default function GistHookForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const validationSchema = Yup.object({
    description: Yup.string()
      .required("Required")
      .min(4, "Description must be at least 4 characters"),
    files: Yup.array(
      Yup.object({
        filename: Yup.string().required(),
        content: Yup.string().required(),
      })
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      files: state ? state.files : [{ filename: "", content: "" }],
      description: state ? state.description : "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSuccess = () => {
    navigate("/");
  };

  const { mutate: createGist } = useCreateGist(onSuccess);
  const { mutate: editGist } = useEditGist(onSuccess);

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "files", // unique name for your Field Array
  });

  const submitForm = async (data: any) => {
    if (state) {
      editGist({
        id: state.id,
        description: data.description,
        files: data.files,
      });
    } else {
      createGist({ description: data.description, files: data.files });
    }
  };

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormHookField
                  {...register("description")}
                  {...field}
                  id={"description"}
                  customstyle="dark"
                  label={"Enter description..."}
                  fullWidth
                  variant={"outlined"}
                  size="small"
                />
              )}
            />

            {fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <MarginDiv>
                    {index !== 0 && (
                      <CancelIcon
                        onClick={() => remove(index)}
                        sx={{
                          position: "absolute",
                          left: -35,
                          cursor: "pointer",
                        }}
                      />
                    )}
                    <Controller
                      name={`files.${index}.filename`}
                      control={control}
                      render={({ field }) => (
                        <FormHookField
                          {...field}
                          customstyle="dark"
                          label={"Enter file name..."}
                          fullWidth
                          variant={"outlined"}
                          size="small"
                        />
                      )}
                    />
                  </MarginDiv>
                  <MarginDiv>
                    <Controller
                      name={`files.${index}.content`}
                      control={control}
                      render={({ field }) => (
                        <FormHookField
                          {...field}
                          id={"content"}
                          customstyle="dark"
                          label={"Enter file content..."}
                          fullWidth
                          variant={"outlined"}
                          size="small"
                          multiline
                          rows={10}
                        />
                      )}
                    />
                  </MarginDiv>
                </div>
              );
            })}
          </div>
          <StyledDiv>
            <Button
              onClick={() => {
                append({ filename: "", content: "" });
              }}
              customstyle="dark"
              text="Add File"
            ></Button>
            <Button
              customstyle="dark"
              type={"submit"}
              text={state ? "Update Gist" : "Create Gist"}
            ></Button>
          </StyledDiv>
        </form>
      </FormContainer>
    </div>
  );
}
