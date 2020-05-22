import React, { useState, Fragment } from 'react';
import { List } from 'antd';
import ChangePassword from '../../../components/ChangePassword';

const passwordStrength = {
  strong: (
    <font className="strong">
      Strong
    </font>
  ),
  medium: (
    <font className="medium">
      Medium
    </font>
  ),
  weak: (
    <font className="weak">
      Weak
    </font>
  ),
};

function SecurityView(props) {
  const [passVisible, setPassVisible] = useState(false);

  function renderPassChange() {
    return (
      passVisible ? (
        <ChangePassword {...props} />
      ) : (
        <>
          {passwordStrength.strong}
        </>
      )
    )
  }


  const getData = () => [
      {
        title: "Account Password",
        description: renderPassChange(),
        actions: [
          <a onClick={() => setPassVisible(!passVisible)}>
            {passVisible ? "Close" : "Modify"}        
          </a>,
        ],
      }
  ]

    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
}

export default SecurityView;
