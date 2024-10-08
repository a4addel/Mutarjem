import React, { useEffect, useState } from 'react';
import { Form as AntForm, Select, Input, Button, Form, Flex } from "antd";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Formik,
  FormikHelpers,
} from "formik";
import * as yup from "yup";
import classnames from "classnames";
import { useToggle } from "react-use";
import { useNavigate } from "react-router-dom";
import { fetch } from "@tauri-apps/api/http";
import { LoadingOutlined } from "@ant-design/icons";

import Languages from "../languages";
import DeepL_JOSN_To_State_Format from "../helpers/deepl-to-state";
import DallEData from "../data/data.json";
import LayoutScreen from "../../src/screens/layout";
import createProject from "../../src/helpers/create-project";

// Define types
type Translations = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}[];

const initFormValues = {
  project_name: "",
  dir: "",
  input_lang: "",
  language: "",
  file: "",
  qc_edition: [],
}

interface FormValues {
  project_name: string;
  dir: string;
  input_lang: string;
  language: string;
  file: File | string;
  qc_edition: string[];
}

// Schema definition
const allowedLangs = Languages.map((e) => e.key);
const schema = yup.object().shape({
  project_name: yup.string().required("ادخل اسماَ للمشروع"),
  dir: yup.string().oneOf(["rtl", "ltr"]).required(),
  input_lang: yup.string().required("اختر لغة المصدر").oneOf(allowedLangs),
  language: yup
    .string()
    .required("اختر اللغة الهدف")
    .notOneOf(
      [yup.ref("input_lang")],
      `لغه المصدر واللغة الهدف يجب ان يكونا مختلفتين`
    )
    .oneOf(allowedLangs),
  file: yup.mixed().required("اختر ملفاَ بصيغه .srt"),
  qc_edition: yup
    .array()
    .of(yup.string())
    .min(1, "اختر علي الاقل قاموسا قرانيا واحدا"),
});

export default function Home() {
  const [loading, setLoading] = useToggle(false);
  const n = useNavigate();
  const [edition, setEditions] = useState<Translations>([]);
  const [failed_toget_edition, setFailed_toget_edition] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFailed_toget_edition("");
    }, 10000);
    return () => clearTimeout(timeout);
  }, [failed_toget_edition]);

  const editions = (edition || []).map((e) => ({
    label: e.identifier,
    value: e.identifier,
  }));

  const onSubmit = async (
    data: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    if (typeof data.file === 'string' || !data.file.name.endsWith(".srt")) {
      formikHelpers.setErrors({ file: "File should be '.srt'" });
      return;
    }
    const id = await createProject({
      projectName: data.project_name,
      // @ts-ignore
      text: JSON.stringify(DeepL_JOSN_To_State_Format(DallEData.json)),
      dir: data.dir,
    });
    if (id) {
      n(`/magic/${id}`);
    }
  };

  return (
    <LayoutScreen>
      <div className={classnames("w-full", "max-w-lg", "mx-auto")}>
        <Formik<FormValues>
          validationSchema={schema}
          initialValues={initFormValues}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <AntForm className={classnames("flex", "flex-col", "gap-1")}>
              {/* Form fields... */}
              <Form.Item label="إسم المشروع" required>
                <Field name="project_name">
                  {({ field }: FieldProps<FormValues>) => (
                    <Input
                    // @ts-ignore
                      value={field.value}
                      className={classnames("flex-grow", "flex-shrink-0")}
                      onChange={(e) =>
                        formikProps.setFieldValue(field.name, e.target.value)
                      }
                    />
                  )}
                </Field>
              </Form.Item>

              
              <Form.Item label="جهة النص" required>
                  <Field name="dir">
                    {({ field }: FieldProps) => (
                      <Select
                        className={classnames("flex-grow", "flex-shrink-0")}
                        onSelect={(e) => formikProps.setFieldValue(field.name, e)}
                        allowClear
                        options={[
                          { label: "LTR", value: "ltr" },
                          { label: "RTL", value: "rtl" },
                        ]}
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
                        onSelect={(e) => formikProps.setFieldValue(field.name, e)}
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

                            setLoading(true);
                            fetch(
                              `http://api.alquran.cloud/v1/edition?language=${e || "EN"}&type=translation`,
                              {
                                method: "GET",
                              },
                            )
                              .then((res) => {
                                if (res.ok) {
                                  // @ts-ignore/
                                  console.log(res.data.data);

                                  // @ts-ignore/
                                  setEditions(res.data.data || []);
                                } else {
                                  setFailed_toget_edition(
                                    "لا يوجد اتصال بالانترنت",
                                  );
                                }
                              })
                              .catch((e) => {
                                setFailed_toget_edition(
                                  "لا يوجد اتصال بالانترنت",
                                );
                              })
                              .finally(() => {
                                setLoading(false);
                              });
                          }}
                          options={Languages}
                        />
                      );
                    }}
                  </Field>
                </Form.Item>

                <Form.Item label="قواميس القران" required className="realtive">
                  <div
                    style={{
                      display: loading ? "flex" : "none",
                    }}
                    className="absolute z-50 w-full h-full bg-slate-300 flex justify-center items-center"
                  >
                    <LoadingOutlined />
                  </div>

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
                  formikProps.setFieldValue("file", e.target.files[0])
                }
                accept=".srt"
                name="file"
                type="file"
              />

              <Button onClick={() => formikProps.handleSubmit()}>هيا!</Button>
              <Flex className="text-red">
                <ErrorMessage className="block" name="project_name" />
                <ErrorMessage className="block" name="input_lang" />
                <ErrorMessage className="block" name="language" />
                <ErrorMessage className="block" name="qc_edition" />
                <ErrorMessage className="block" name="file" />
                {failed_toget_edition}
              </Flex>
            </AntForm>
          )}
        </Formik>
      </div>
    </LayoutScreen>
  );
}