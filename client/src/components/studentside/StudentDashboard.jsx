import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {UserCircleIcon, InboxIcon, PowerIcon} from '@heroicons/react/24/solid';
import logo from '../assets/images/logo.png';
import {Link} from 'react-router-dom';

import React from 'react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const StudentDashboard = () => {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '../../';
  };
  return (
    <Card
      className={
        ' min-h-screen max-h-full w-full max-w-[20rem] p-4    shadow-2xl  shadow-blue-gray-900/5'
      }
    >
      <div className={'mb-2 p-4'}>
        <Typography variant="h5" color="blue-gray">
          <img
            src={logo}
            alt="logo picture"
            className="w-[90px] h-[90px] mx-auto"
          />
          <p className={'text-3xl tracking-widest mt-4 mb-[-1.5rem]'}>
            CTU Library
          </p>
        </Typography>
      </div>
      <List>
        <Link to="/student/booklists">
          <ListItem>
            <ListItemPrefix>
              <LibraryBooksIcon className={'h-5 w-5'} />
            </ListItemPrefix>
            Books
          </ListItem>
        </Link>
        <Link to="/student/borrowedbooklists">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className={'h-5 w-5'} />
            </ListItemPrefix>
            Borrowed Books
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className={'h-5 w-5'} />
          </ListItemPrefix>
          Student
        </ListItem>

        <ListItem onClick={logOut}>
          <ListItemPrefix>
            <PowerIcon className={'h-5 w-5'} />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default StudentDashboard;
