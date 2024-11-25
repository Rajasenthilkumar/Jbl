import type { ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    colorText: '#051621',
    colorTextSecondary: '#969696',
    colorTextTertiary: '#475467',
    colorTextQuaternary: '#667085',
    colorBorder: '#D0D5DD',
    colorBorderSecondary: '#EAECF0',
    colorPrimary: '#3AB4FD',
    colorLink: '#3AB4FD',
    colorLinkHover: '#3AB4FD',
    colorSuccess: '#55B938',
    colorError: '#ED4337',
  },
  components: {
    Pagination: {
      itemActiveBg: '#3AB4FD',
    },
    Button: {
      borderRadius: 4,
      borderRadiusLG: 4,
      borderRadiusSM: 4,
      borderRadiusXS: 4,
    },
  },
};

export default antdTheme;
