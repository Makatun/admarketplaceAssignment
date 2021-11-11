
import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { CommentFormValues } from '../types';


interface Props {
    onSubmit: (values: CommentFormValues) => void
}


const CommentForm: React.FC<Props> = ({ onSubmit }) => {


    return (
        <Formik
            initialValues={{
                name: '',
                body: '',
                email: '',
            }}
            onSubmit={(values, { setSubmitting }) => onSubmit(values)}
        >
            <Form>
                <div className="formContainer">

                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>


                            <div className="formField">
                                <Field id="name" name="name" placeholder="Name" data-testid="name" />
                            </div>

                            <div className="formField">
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="john@acme.com"
                                    type="email"
                                    data-testid="email"
                                />
                            </div>
                        </div>

                        <div className="formField">
                            <Field id="body" name="body" as='textarea' placeholder="Comment" rows="4" data-testid="body" />
                        </div>

                        <div className="formField">
                            <button type="submit" data-testid="submit">Post Comment</button>
                        </div>

                    </div>
                </div>
            </Form>
        </Formik >
    )
}

export default CommentForm