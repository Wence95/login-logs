// src/admin/components/LoginLogsPage.js
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import { Component } from 'flarum/common/utils';

export default class LoginLogsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.logs = [];

    // Fetch logs from the API
    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/loginLogs',
    }).then((response) => {
      this.logs = response.data;
      m.redraw();
    });
  }

  content() {
    return (
      <div className="LoginLogsPage">
        <div className="container">
          <h2>Login Logs</h2>
          <table className="DashboardWidget Widget LoginLogsTable">
            <thead>
            <tr>
              <th>Usuario</th>
              <th>Tiempo de conexión</th>
              <th>Tiempo de desconexión</th>
            </tr>
            </thead>
            <tbody>
            {this.logs.map((log) => (
              <tr>
                <td>{log.attributes.username}</td>
                <td>{log.attributes.logged_in_at}</td>
                <td>{log.attributes.logged_out_at || 'N/A'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
