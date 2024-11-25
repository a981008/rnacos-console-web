import enUS from 'naive-ui/lib/locales/common/enUS.js';
const message = {
  cluster: {
    node: 'Node',
    address: 'Address',
    masternode: 'Master Node',
    cluster_info: 'Cluster Info'
  },
  config: {
    config: 'Config',
    config_group: 'Config Group',
    confirm_delete_config_action:
      'Are You Sure to Delete the Config in Group:<%:=group%>,dataID:<%:=dataId%>？',
    confirm_recover_config_action:
      'Are You Sure to Recover the Config ID:<%:=id%>？',
    comparison_of_configuration_changes: 'Comparison of configuration changes',
    current_configuration: 'Current configuration',
    new_configurations_to_be_submitted: 'New configurations to be submitted',
    set: 'set',
    get: 'get',
    dataId: 'dataId',
    input_dataId: 'input dataId',
    need_input_dataId: 'Need to input dataId',
    input_config_group: 'input config group',
    desc: 'Desc',
    input_desc: 'Input Desc',
    configType: 'config type',
    content: 'Content',
    input_content: 'Input Content',
    check_fail: 'Check Fail',
    config_history: 'Config History',
    confirm_change: 'Confirm Change',
    diff_content: 'Diff Config Content',
    recover_fail: 'Recover Fail',
    recover_success: 'Recover Success',
    history_record_content: 'history reord content',
    recover_history: 'recover_history',
    config_list: 'Config List',
    export_config: 'Export Config',
    import_config: 'Import Config'
  },
  namespace: {
    namespace: 'Namespace',
    the_namespace_id_has_been_copied: 'The namespace id has been copied!',
    namespaceName: 'Namespace Name',
    namespaceId: 'Namespace Id',
    new_namespace: 'New Namespace',
    add_namespace: 'Add Namespace',
    edit_namespace: 'Edit Namespace',
    namespaceId_or: 'Namespace Id,null then auto create'
  },
  instance: {
    port: 'Port',
    ephemeral: 'Ephemeral',
    weight: 'Weight',
    healthy: 'Healthy',
    metadata: 'Metadata'
  },
  service: {
    name: 'Name',
    groupName: 'Group Name',
    ipCount: 'Instance Count',
    healthyInstanceCount: 'Healthy Instance Count',
    instance: 'Service Instance',
    confirm_delete_service_action:
      'Are You Sure to Delete the Service :<%:=name%>,in Group:<%:=groupName%>？'
  },
  passwordpanel: {
    input_old_password: 'Input Old Password',
    input_new_password: 'Input New Password',
    old_password: 'Old Password',
    new_password: 'New Password',
    new_password_confirm: 'New Password Confirm',
    input_new_password_confirm: 'Input New Password And Confirm',
    need_input_new_password: 'You need Input New Password',
    need_input_old_password: 'You need Input Old Password',
    you_will_need_to_enter_a_new_password_for_a_second_confirmation:
      'You will need to enter a new password for a second confirmation',
    confirm_that_the_content_does_not_match_the_new_password:
      'Confirm that the content does not match the new password',
    reset_password: 'Modify Password',
    logout: 'Logout',
    logout_success: 'Logout Success',
    reset_password_success: 'Modify Password Success！',
    the_input_cannot_be_empty: 'The input cannot be empty'
  },
  user: {
    username: 'username',
    nickname: 'nickname',
    gmtCreate: 'gmtCreate',
    gmtModified: 'gmtModified',
    roles: 'roles',
    enable: 'enable',
    confirm_delete_user_action: 'Are you sure to delete user:<%:=username%> ？'
  },
  role: {
    admin: 'Admin',
    developer: 'Developer',
    guest: 'Guest'
  },
  common: {
    query: 'Query',

    status: 'Status',
    yes: 'Yes',
    no: 'No',
    enabled: 'Enabled',
    disabled: 'Disabled',
    confirm: 'Confirm',
    title: 'Title',
    return: 'Return',
    confirm_action: 'Do you want to confirm the action?',
    delete: 'Delete',
    edit: 'Edit',
    detail: 'Detail',
    history: 'History',
    operation: 'Operation',
    clone: 'Clone',
    updatedtime: 'Updated Time',
    recover: 'Recover',
    request_fail: 'Request Fail',
    refresh: 'Refresh',
    total: 'Total',
    add: 'Add',
    home: 'Home'
  },
  monitor: {
    system_monitor: 'System Monitor',
    service_node: 'Service Node',
    interval_type: 'Interval Type',
    auto_refresh: 'Auto Refresh',
    app_cpu_usage: 'Cpu Usage',
    app_cpu_usage_percent: 'Cpu Usage Percent(%)',
    app_memory_usage: 'Memory Usage',
    app_memory_usage_percent: 'Memory Usage Percent(%)',
    app_rss_memory: 'RSS Memory',
    app_rss_memory_m: 'RSS Memory(M)',
    http_request_rps: 'http request rps',
    http_request_count: 'http request count',
    http_request_rt: 'http request avg time',
    http_request_rt_ms: 'http request avg time(ms)',
    grpc_request_rps: 'grpc request rps',
    grpc_request_count: 'grpc request count',
    grpc_request_rt: 'grpc request rt avg time',
    grpc_request_rt_ms: 'grpc request rt avg time(ms)',
    config_data_size: 'config data size',
    config_data_size_n: 'config data size',
    config_listener_client_size: 'http config listener client size',
    config_listener_client_size_n: 'http config listener client size',
    config_subscriber_client_size: 'grpc config subscriber client size',
    config_subscriber_client_size_n: 'grpc config subscriber client size',
    naming_service_size: 'naming service size',
    naming_service_size_n: 'naming service size',
    naming_instance_size: 'naming instance size',
    naming_instance_size_n: 'naming instance size',
    naming_subscriber_client_size: 'grpc naming subscriber client size',
    naming_subscriber_client_size_n: 'grpc naming subscriber client size',
    http_request_handle_rt_summary: 'http request avg handle time',
    http_request_handle_rt_summary_percent_ms:
      'http request avg handle time percent(ms)',
    grpc_request_handle_rt_summary: 'grpc request avg handle time',
    grpc_request_handle_rt_summary_percent_ms:
      'grpc request avg handle time percent(ms)',
    LEAST: 'LEAST',
    MINUTE: 'MINUTE',
    HOUR: 'HOUR',
    DIRECT_NODE: 'DIRECT NODE'
  },
  login: {
    password: 'Password',
    captcha: 'captcha',
    login: 'Login',
    need_username: 'Need Username',
    need_password: 'Need Password',
    need_captcha: 'Need captcha',
    get_captcha_fail: 'Get captcha fail',
    USER_CHECK_ERROR: 'User or Password Error',
    CAPTCHA_CHECK_ERROR: 'captcha error',
    LOGIN_LIMITE_ERROR: 'login error too more times',
    LOGIN_UNKNOWN_ERROR: 'login fail unknown error'
  }
};
export default {
  ...message,
  ...enUS
};
