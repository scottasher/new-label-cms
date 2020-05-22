import React from 'react';
import { notification } from 'antd';

export function createAlert(values, history) {
  // console.log(values, history)
  if(!values) {
    notification.danger({
      message: 'Uknown Error',
      description: 'An unknown error occured, please try again later.',
    });
  }
  const { type, alert, description } = values;
  // console.log('[ALERT VALUES]', values)
  if(type === true) {
    // console.log('[HIT TYPE TRUE IN ALERT]', values.type)

    return history.push('/user/register/result')
  }
  notification[type]({
    message: alert,
    description: description,
  });


  if(history) {
    console.log('[HISTORY]', history, values)
    history.push(values.redirect)
  }
}