import React from 'react';
import { useDispatch } from 'react-redux';
import { TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut } from '~/store/modules/auth/actions';

export default function LogoutButton({ ...rest }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOut());
  };
  return (
    <TouchableNativeFeedback onPress={handleLogout}>
      <Icon {...rest} name="sign-out" size={20} color="#ee4e62" />
    </TouchableNativeFeedback>
  );
}
