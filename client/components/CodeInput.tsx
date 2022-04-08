import AuthCode from 'react-auth-code-input';

import authStyles from './auth.module.css';

const CODE_LENGTH = 6;

export function CodeInput({ setCode }: { setCode: (code: string) => void }) {
  return (
    <AuthCode
      length={CODE_LENGTH}
      onChange={(value) => {
        if (value?.length === CODE_LENGTH) {
          setCode(value);
        } else {
          setCode(undefined);
        }
      }}
      allowedCharacters="numeric"
      containerClassName={authStyles.container}
      inputClassName={authStyles.input}
    />
  );
}
