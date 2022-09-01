import {
  FormButton,
  Label,
  ErrorText,
} from 'components/ContactsForm/ContactForm.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { addItem, getItemValue } from 'redux/contacts';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().min(2).required(),
  number: yup.number().min(7).required(),
});

export const ContactForm = () => {
const items = useSelector(getItemValue);
  const dispatch = useDispatch();
  

  const handleSubmit = ({name, number}, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      items.find(item =>
        item.name.toLowerCase().includes(newContact.name.toLowerCase())
      )
    ) {
      toast.info(`${newContact.name} is already in contact`);
      return;
    } else {
      dispatch(addItem(newContact));
    }
    resetForm();
  };

 
    return (
      <Formik
        initialValues={{name: '', number: ''}}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
          <Form>
            <Label>
              Name:
              <Field
                type="text"
                name="name"                
              />
              <ErrorMessage
                name="name"
                render={msg => <ErrorText>{msg}</ErrorText>}
              />
            </Label>
            <Label>
              Number:
              <Field
                type="tel"
                name="number"
              />
              <ErrorMessage
                name="number"
                render={msg => <ErrorText>{msg}</ErrorText>}
              />
            </Label>

            <FormButton type="submit">Add contact</FormButton>
          </Form>
      </Formik>
    );
  }