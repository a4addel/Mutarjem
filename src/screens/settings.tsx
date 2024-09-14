import React, { useEffect, useState } from "react";
import { Form as AntForm, Input, Button, Form, Flex } from "antd";
import { ErrorMessage, Field, FieldProps, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import classnames from "classnames";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import LayoutScreen from "../../src/screens/layout";
import setLink from "../helpers/set-link";
import setKey from "../helpers/save-kety";
import { AUTHL_KeyPath, AUTHL_LinkPath } from "../consts";

interface FormValues {
  endpoint: string;
  key: string;
}

const schema = yup.object().shape({
  endpoint: yup.string().required().url(),
  key: yup.string().required(),
});

export default function Settings() {
  const [endpoint, setEndpoint] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    async function main() {
      try {
        const d = await readTextFile(await AUTHL_LinkPath(), {
          dir: BaseDirectory.Home,
        });
        setEndpoint(d.split("\n")[0] || "");
        const k = await readTextFile(await AUTHL_KeyPath(), {
          dir: BaseDirectory.Home,
        });
        setKey(k.split("\n")[0] || "");
      } catch (error) {
        console.error("Error reading files:", error);
      }
    }
    main();
  }, []);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      await setLink(values.endpoint);
      await setKey(values.key);
      // You might want to add some success feedback here
    } catch (error) {
      console.error("Error saving values:", error);
      // You might want to add some error feedback here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LayoutScreen>
      <div className={classnames("w-full", "max-w-lg", "mx-auto")}>
        <Formik
          validationSchema={schema}
          initialValues={{
            endpoint,
            key,
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue }) => (
            <AntForm className={classnames("flex", "flex-col", "gap-1")}>
              <p className="text-center !text-4xl p-2 m-2 font-bold">
                أدخل بيانات التوثيق
              </p>
              <Form.Item label="رابط" required>
                <Field name="endpoint">
                  {({ field }: FieldProps) => (
                    <Input
                      value={field.value}
                      className={classnames("flex-grow", "flex-shrink-0")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue(field.name, e.target.value)
                      }
                    />
                  )}
                </Field>
              </Form.Item>
              <Form.Item label="المفتاح" required>
                <Field name="key">
                  {({ field }: FieldProps) => (
                    <Input
                      value={field.value}
                      className={classnames("flex-grow", "flex-shrink-0")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue(field.name, e.target.value)
                      }
                    />
                  )}
                </Field>
              </Form.Item>
              <Button onClick={() => handleSubmit()}>
                فحص مصداقيه البيانات
              </Button>
              <Flex className="text-red">
                <ErrorMessage
                  className="block"
                  name="endpoint"
                  component="div"
                />
                <ErrorMessage className="block" name="key" component="div" />
              </Flex>
            </AntForm>
          )}
        </Formik>
      </div>
    </LayoutScreen>
  );
}
