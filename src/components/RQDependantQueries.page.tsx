import axios from 'axios';
import { useQuery } from 'react-query';

import { Channel, User } from '../types';

type RQDependantQueriesProps = {
  email: string;
};

const fetchUserByEmail = (email: string) => {
  return axios.get<User>(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId: string) => {
  return axios.get<Channel>(`http://localhost:4000/channels/${channelId}`);
};

export const RQDependantQueries: React.FC<RQDependantQueriesProps> = ({
  email,
}) => {
  const { data: user } = useQuery(['string', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId!), {
    enabled: !!channelId,
  });

  return <div>RQ Dependant Queries</div>;
};
