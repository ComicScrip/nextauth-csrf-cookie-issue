import { getCsrfToken, signIn } from 'next-auth/react';

export default function Login({ csrfToken }) {
  return (
    <form
      method='post'
      action='/api/auth/callback/credentials'
      onSubmit={(e) => {
        e.preventDefault();
        // From https://next-auth.js.org/configuration/pages#credentials-sign-in :
        // "You can also use the signIn() function which will handle obtaining the CSRF token for you"
        // Yes, but this works only with clients that have not disabled JS in their browsers
        signIn('credentials', {
          username: e.target.elements.username.value,
          password: e.target.elements.password.value,
        });
      }}
    >
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <label>
        Username
        <input name='username' type='text' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button type='submit'>Sign in</button>
    </form>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/
