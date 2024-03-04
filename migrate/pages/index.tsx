import { Form as AntForm, Select, Input, Button, Form } from "antd";
 import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import * as yup from "yup";
import useAxios from "axios-hooks";
import classnames from "classnames";
import { useToggle } from "react-use";
import Loading from "../components/Loading";
import Languages from "../languages";
import{Link} from "react-router-dom";
import DeepL_JOSN_To_State_Format from "../helpers/DeepL_JOSN_To_State_Format";

import DallEData from "../data/data.json";

import LayoutScreen from "../../src/screens/layout"
import createProject from "../../src/helpers/create-project";
type Translations = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}[];

 
 
export default function Home() {
  const [disabled, _setDisabled] = useToggle(false);
  
  const [edition, fetchEditions] = useAxios(
    {
      method: "GET",
      
    },
    {
      useCache: false,
      autoCancel: false,
    },
  );

  const editions = edition.data
    ? (edition.data.data as Translations).map((e) => ({
        label: e.identifier,
        value: e.identifier,
      }))
    : [];

 
  const onSubmit = (data: yup.InferType<typeof schema>) => {
    createProject({
      projectName: data.project_name,
      // @ts-ignore
      text: JSON.stringify(DeepL_JOSN_To_State_Format(DallEData.json))
    })
  };

  return (
    <LayoutScreen>
    <div className={classnames("w-full", "max-w-lg", "mx-auto")}>
      <Loading isLoading={disabled || edition.loading} />
      <Formik
        validationSchema={schema}
        initialValues={{
          project_name: "",
          input_lang: "EN",
          language: "EN",
          file: "",
          qc_edition: [],
        }}
        onSubmit={onSubmit}
      >
        {(form) => {
          return (
            <AntForm className={classnames("flex", "flex-col", "gap-1")}>
              {JSON.stringify(form.values, null, 2)}
              <Form.Item label="Project name" required>
                <Field name="project_name">
                  {({ field }: FieldProps) => (
                    <Input
                      value={field.value}
                      className={classnames("flex-grow", "flex-shrink-0")}
                      onChange={(e) => form.setFieldValue(field.name, e.target.value)}
                      
                    />
                  )}
                </Field>
              </Form.Item>
              <ErrorMessage name="project_name" />
              <Form.Item label="Source Language" required>
                <Field name="input_lang">
                  {({ field }: FieldProps) => (
                    <Select
                      defaultValue={field.value}
                      className={classnames("flex-grow", "flex-shrink-0")}
                      onSelect={(e) => form.setFieldValue(field.name, e)}
                      options={Languages}
                    />
                  )}
                </Field>
              </Form.Item>
              <ErrorMessage name="input_lang" />

              <Form.Item label="Target Language" required>
                <Field name={"language"}>
                  {({ field, form }: FieldProps) => {
                    return (
                      <Select
                        className={classnames("flex-grow", "flex-shrink-0")}
                        defaultValue={form.values.language}
                        onChange={(e) => {
                          form.setFieldValue(field.name, e);
                          form.setFieldValue("qc_edition", []);
                          fetchEditions({
                            url: `http://api.alquran.cloud/v1/edition?language=${e}&type=translation`,
                          });
                        }}
                        options={Languages}
                      />
                    );
                  }}
                </Field>
              </Form.Item>

              <ErrorMessage name="language" />

              <Form.Item label="Source Language" required>
                <Field name="qc_edition">
                  {({ field, form }: FieldProps) => (
                    <Select
                      value={field.value}
                      className={classnames("flex-grow", "flex-shrink-0")}
                      onChange={(e) => form.setFieldValue(field.name, e)}
                      mode="tags"
                      options={editions ?? []}
                    />
                  )}
                </Field>
              </Form.Item>
              <ErrorMessage name="qc_edition" />

              {form.errors.qc_edition && <span>{form.errors.qc_edition}</span>}
              <Input
                required
                onChange={(e) =>
                  e?.target?.files &&
                  form.setFieldValue("file", e.target.files[0])
                }
                accept=".srt"
                name="file"
                type="file"
              />
              <ErrorMessage name="file" />
              <Button onClick={() => form.handleSubmit()}  >
                Let's Dance, Baby!
              </Button>
              <Link to={"/magic"}>Magic</Link>
            </AntForm>
          );
        }}
      </Formik>
    </div></LayoutScreen>
  );
}

const schema = yup.object().shape({
  project_name: yup.string().required(),
  input_lang: yup.string().required(),
  language: yup
    .string()
    .required()
    .notOneOf(
      [yup.ref("input_lang")],
      "target language cannot be the same as source language",
    ),
  file: yup.mixed().required(),
  qc_edition: yup.array().of(yup.string()).min(1),
});
