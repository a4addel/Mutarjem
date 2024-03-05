import { Form as AntForm, Select, Input, Button, Form, Flex } from "antd";
import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import * as yup from "yup";
import classnames from "classnames";
import { useToggle } from "react-use";
import Languages from "../languages";
import DeepL_JOSN_To_State_Format from "../helpers/DeepL_JOSN_To_State_Format";
import { useNavigate } from "react-router-dom";
import { fetch } from "@tauri-apps/api/http";
import DallEData from "../data/data.json";

import LayoutScreen from "../../src/screens/layout";
import createProject from "../../src/helpers/create-project";
import { useState } from "react";
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
  const n = useNavigate()
  const [edition, setEditions] = useState<Translations>([]);

  const editions = ((edition || []) as Translations)?.map((e) => ({
    label: e.identifier,
    value: e.identifier,
  }));



  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    const id = await createProject({
      projectName: data.project_name,
      // @ts-ignore
      text: JSON.stringify(DeepL_JOSN_To_State_Format(DallEData.json))
    })
    if (id) {
      n(`/magic/${id}`)
    }
  };

  return (
    <LayoutScreen>
      <div className={classnames("w-full", "max-w-lg", "mx-auto")}>
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
                <Form.Item label="إسم المشروع" required>
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

                <Form.Item label="لغة المصدر" required>
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


                <Form.Item label="اللغه الهدف" required>
                  <Field name={"language"}>
                    {({ field, form }: FieldProps) => {
                      return (
                        <Select
                          className={classnames("flex-grow", "flex-shrink-0")}
                          defaultValue={form.values.language}
                          onChange={(e) => {
                            form.setFieldValue(field.name, e);
                            form.setFieldValue("qc_edition", []);
                            console.log("sssssssssssssss");
                            // @ts-ignore

                            fetch(`http://api.alquran.cloud/v1/edition?language=${e || "EN"}&type=translation`, {
                              method: "GET"
                            }).then(res => {
                              if (res.ok) {
                                // @ts-ignore/
                                console.log(res.data.data);

                                // @ts-ignore/
                                setEditions(res.data.data || [])
                              }
                            })




                          }}
                          options={Languages}
                        />
                      );
                    }}
                  </Field>
                </Form.Item>

                <Form.Item label="قواميس القران" required>
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

                <Button onClick={() => form.handleSubmit()}  >
                  هيا!
                </Button>
                <Flex className="text-red">
                  <ErrorMessage className="block" name="project_name" />
                  <br/>
                  <ErrorMessage className="block"  name="input_lang" />
                  <br/>
                  <ErrorMessage className="block"  name="language" />
                  <br/>
                  <ErrorMessage className="block"  name="qc_edition" />
                  <br/>
                  <ErrorMessage className="block"  name="file" />
                </Flex>
              </AntForm>
            );
          }}

        </Formik>

      </div></LayoutScreen>
  );
}

const schema = yup.object().shape({
  project_name: yup.string().required("ادخل اسماَ للمشروع"),
  input_lang: yup.string().required("اختر لغة المصدر"),
  language: yup
    .string()
    .required("اختر اللغة الهدف")
    .notOneOf(
      [yup.ref("input_lang")],
      `لغه المصدر واللغة الهدف يجب ان يكونا مختلفتين`,
    ),
  file: yup.mixed().required("اختر ملفاَ بصيغه .srt"),
  qc_edition: yup.array().of(yup.string()).min(1, "اختر علي الاقل قاموسا قرانيا واحدا"),
});
