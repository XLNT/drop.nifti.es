import { GetServerSideProps } from 'next';
import { getGranter } from 'server/lib/granter';
import weighted from 'weighted';

const matt = getGranter('matt');

const WEIGHTS = {
  [matt.ids[0]]: 1,
  [matt.ids[1]]: 2,
  [matt.ids[2]]: 3,
  [matt.ids[3]]: 3,
  [matt.ids[4]]: 2,
};

export default function Matt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = weighted(WEIGHTS);

  return {
    redirect: {
      destination: `/matt/${id}`,
      permanent: false,
    },
  };
};
