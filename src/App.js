import React, { useEffect } from 'react';
import 'amazon-connect-streams';
 
const App= () => {
  useEffect(() => {
    window.connect.core.initCCP(document.getElementById('ccp-container'), {
      ccpUrl: 'https://p3f-learn.my.connect.aws/ccp-v2/softphone',
      loginPopup: true,
      softphone: { allowFramedSoftphone: true }
    });
  },[]);
 
  return (
    <div>
      <h2>My Custom Amazon Connect CCP</h2>
      <div id="ccp-container" style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}></div>
    </div>
  );
};
 
export default App;