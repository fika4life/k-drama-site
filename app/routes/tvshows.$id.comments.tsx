import {
  useParams,
  Form,
  json,
  useLoaderData,
  useActionData,
  useNavigation
} from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { db } from '~/db.server';

export const loader = async ({ params }) => {
  const data = await db.comments.findMany({
    where: {
      tvId: params.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return json({ data });
};

export async function action({ request }) {
  const formData = await request.formData();

  const data = await db.comments.create({
    data: {
      message: formData.get('message') as string,
      tvId: formData.get('id') as string
    }
  });

  return json({ data });
}

export default function Comments() {
  const { id } = useParams();
  const { data: comments } = useLoaderData();

  const formRef = useRef();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);

  return (
    <div className="px-4">
      <h2 className="text-xl font-bold text-center">Comments</h2>
      <Form method="POST" ref={formRef}>
        <div className=" max-w-xl">
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              className="block w-full rounded-md border-gray-300  border-2 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 p-2 mb-4 "
              rows={3}
              placeholder="Leave a message"
              name="message"
            ></textarea>
          </div>
        </div>

        <input type="hidden" name="id" value={id} />

        {navigation.state === 'submitting' ? (
          <button
            type="submit"
            className="rounded-lg border border-primary-500 bg-sky-400 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
            disabled
          >
            Submitting...
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-lg border border-primary-500 bg-sky-400 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
          >
            Add comment
          </button>
        )}
      </Form>

      {comments.map((comment) => {
        return <p key={comment.id}>{comment.message}</p>;
      })}
    </div>
  );
}
