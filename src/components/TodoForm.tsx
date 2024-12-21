import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onSubmit: (values: Partial<Todo>) => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Please enter a task title')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters'),
});

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-8">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="flex-grow">
            <label htmlFor="newTodo" className="sr-only">New task title</label>
            <input
              id="newTodo"
              type="text"
              {...formik.getFieldProps('title')}
              placeholder="Add a new task..."
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-xl text-lg
                       bg-white dark:bg-surface-dark
                       border border-slate-200 dark:border-slate-700
                       focus:outline-none focus:ring-2 focus:ring-primary-light
                       text-slate-800 dark:text-slate-200
                       placeholder:text-slate-400 dark:placeholder:text-slate-500"
              aria-describedby="titleHelp titleCount"
            />
          </div>
          <button
            type="submit"
            aria-label="Add new todo"
            disabled={!formik.isValid || !formik.dirty}
            className="flex-shrink-0 bg-primary-light hover:bg-primary-dark
                     text-white px-4 py-2.5 rounded-xl
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-primary-light
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="w-6 h-6" aria-hidden="true" />
            <span className="sr-only">Add task</span>
          </button>
        </div>

        <div className="flex justify-between items-center text-xs px-1">
          <span 
            id="titleHelp"
            className="text-slate-500 dark:text-slate-400"
          >
            {formik.touched.title && formik.errors.title ? (
              formik.errors.title
            ) : (
              ' '
            )}
          </span>
          <span 
            id="titleCount"
            className="text-slate-500 dark:text-slate-400"
          >
            {formik.values.title.length}/50
          </span>
        </div>
      </div>
    </form>
  );
};
