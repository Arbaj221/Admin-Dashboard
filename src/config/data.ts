import acccountIcon from 'src/assets/images/svgs/icon-account.svg';
import avatar1 from 'src/assets/images/profile/user-2.jpg';
import avatar2 from 'src/assets/images/profile/user-3.jpg';
import avatar3 from 'src/assets/images/profile/user-4.jpg';
import avatar4 from 'src/assets/images/profile/user-5.jpg';
import avatar5 from 'src/assets/images/profile/user-6.jpg';

//   Message Data
interface MessageType {
  title: string;
  avatar: string;
  subtitle: string;
}

//  Profile Data
interface ProfileType {
  title: string;
  img: string;
  subtitle: string;
  url: string;
  icon: string
}

const MessagesLink: MessageType[] = [
  {
    avatar: avatar1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: avatar2,
    title: 'New message',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: avatar3,
    title: 'Bianca sent payment',
    subtitle: 'Check your earnings',
  },
  {
    avatar: avatar4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar: avatar5,
    title: 'John received payment',
    subtitle: '$230 deducted from account',
  },
];

const profileDD: ProfileType[] = [
  {
    img: acccountIcon,
    title: 'My Profile',
    subtitle: 'Account settings',
    icon: "tabler:user",
    url: '/user-profile',
  }
];

export { MessagesLink, profileDD };
