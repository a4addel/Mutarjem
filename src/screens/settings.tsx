import { Form as AntForm, Select, Input, Button, Form, Flex } from "antd";
import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import * as yup from "yup";
import classnames from "classnames";

import LayoutScreen from "../../src/screens/layout";
import setLink from "../helpers/set-link";
import setKEy from "../helpers/save-kety";
import { useEffect, useState } from "react";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { AUTHL_KeyPath, AUTHL_LinkPath } from "../consts";


export default function Settings() {
  const endpoint = useState("");
  const key = useState("");
  useEffect(() => {
    
    async function main() {
      console.log("ssssssssss");

      try {
        const d = await readTextFile(await AUTHL_LinkPath(), { dir: BaseDirectory.Home });
        console.log(d);
        
        endpoint[1](d.split("\n")[0] || "")
        const k = await readTextFile(await AUTHL_KeyPath(), { dir: BaseDirectory.Home });

        key[1](k.split("\n")[0] || "")

      } catch (error) {
        
      }
    }
    main()
  }, [])
  return (
    <LayoutScreen>
      <div className={classnames("w-full", "max-w-lg", "mx-auto")}>
 
        <Formik
          validationSchema={schema}
          initialValues={{
            endpoint: endpoint[0],
            key: key[0]
          }}
          enableReinitialize
          onSubmit={(e) => {
            setLink(e.endpoint)
            setKEy(e.key)
          }}
        >
          {(form) => {
            return (
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
                        onChange={(e) =>{
                           form.setFieldValue(field.name, e.target.value);
                          }}
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
                        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
                      />
                    )}
                  </Field>
                </Form.Item>
                <Button onClick={() => form.handleSubmit()}>فحص مصداقيه البيانات</Button>
                <Flex className="text-red">
                  <ErrorMessage className="block" name="endpoint" />
                  <br />
                  <ErrorMessage className="block" name="key" />

                </Flex>
              </AntForm>
            );
          }}
        </Formik>
      </div>
    </LayoutScreen>
  );
}

const schema = yup.object().shape({
  endpoint: yup.string().required().url(),
  key: yup.string().required(),
});

