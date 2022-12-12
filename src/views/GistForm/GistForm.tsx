import React from "react";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { StyledDiv, FormContainer, MarginDiv } from "./GistForm.styles";
import { createNewGist, editGist } from "../../api/api";
import CancelIcon from "@mui/icons-material/Cancel";

export default function GistForm() {
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

  const initialValues = {
    files: [{ filename: "", content: "" }],
    description: "",
  };

  if (state) {
    initialValues.description = state.description;
    initialValues.files = state.files;
    console.log(initialValues);
  }

  const onSubmit = async (values: any) => {
    if (state) {
      const response = await editGist(
        state.id,
        values.description,
        values.files
      );
    } else {
      const response = await createNewGist(values.description, values.files);
    }
    navigate("/");
  };

  console.log(state);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={({ values }) => (
          <Form>
            <FormContainer>
              <div>
                <FormField
                  name={"description"}
                  id={"description"}
                  customstyle="dark"
                  label={"Enter description..."}
                  fullWidth
                  variant={"outlined"}
                  size="small"
                />
              </div>
              <FieldArray
                name="files"
                render={(arrayHelpers) => (
                  <>
                    {React.Children.toArray(
                      values.files.map((file, index) => {
                        return (
                          <div key={index}>
                            <MarginDiv>
                              {index !== 0 && (
                                <CancelIcon
                                  onClick={() => arrayHelpers.remove(index)}
                                  sx={{
                                    position: "absolute",
                                    left: -35,
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                              <FormField
                                name={`files[${index}].filename`}
                                id={`files[${index}].filename`}
                                customstyle="dark"
                                label={"Enter file name..."}
                                fullWidth
                                variant={"outlined"}
                                size="small"
                              />
                            </MarginDiv>
                            <MarginDiv>
                              <FormField
                                name={`files[${index}].content`}
                                id={`files[${index}].content`}
                                customstyle="dark"
                                label={"Enter file content..."}
                                variant={"outlined"}
                                multiline
                                rows={10}
                                fullWidth
                              />
                            </MarginDiv>
                          </div>
                        );
                      })
                    )}
                    <StyledDiv>
                      <Button
                        customstyle="dark"
                        onClick={() =>
                          arrayHelpers.push({ filename: "", content: "" })
                        }
                        text="Add File"
                      ></Button>
                      <Button
                        customstyle="dark"
                        type={"submit"}
                        text={state ? "Update Gist" : "Create Gist"}
                      ></Button>
                    </StyledDiv>
                  </>
                )}
              />
            </FormContainer>
          </Form>
        )}
      ></Formik>
    </div>
  );
}
