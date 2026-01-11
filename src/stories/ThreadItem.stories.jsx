import ThreadItem from '../components/threads/ThreadItem';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
};

const fakeThread = {
  id: 'thread-1',
  title: 'Belajar React Testing dengan Jest',
  body: 'Ini adalah contoh thread untuk Storybook agar komponen ThreadItem bisa ditampilkan dengan realistis.',
  ownerId: 'user-1',
  createdAt: new Date().toISOString(),
  totalComments: 5,
  upVotesBy: [],
  downVotesBy: [],
};

export const Default = {
  args: {
    thread: fakeThread,
  },
};

export const WithManyComments = {
  args: {
    thread: {
      ...fakeThread,
      totalComments: 20,
      title: 'Thread dengan banyak komentar',
    },
  },
};

export const LongTitle = {
  args: {
    thread: {
      ...fakeThread,
      title:
        'Judul thread yang sangat panjang untuk melihat bagaimana tampilan UI ketika judul melebihi satu baris di komponen ThreadItem',
    },
  },
};
