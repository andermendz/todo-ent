import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    <form onSubmit={formik.handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <div className="flex-grow">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter todo title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};
