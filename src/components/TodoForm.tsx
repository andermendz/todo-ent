import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onSubmit: (values: Partial<Todo>) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
});

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Todo Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </div>
    </Box>
  );
};
