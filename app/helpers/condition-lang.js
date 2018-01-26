import { helper } from '@ember/component/helper';

const langs = {
    'create': '<span style="color: red;">确定</span>是<span style="color: red;">创建</span>新记录的接口',
    'delete': '<span style="color: red;">确定</span>是<span style="color: red;">删除</span>已有记录的接口',
    'edit': '不是另外三项，可能是编辑接口',
    'get': '<span style="color: red;">确定</span>是<span style="color: red;">单纯读取</span>已有记录的接口',

    'single': '<span style="color: red;">确定</span>是操作<span style="color: red;">单条记录</span>的接口',
    'multi': '可能会操作多条记录',
    'all': '<span style="color: red;">确定</span>要获取<span style="color: red;">所有</span>记录',

    'id': '<span style="color: red;">确定</span>能提供将要<span style="color: red;">被操作记录的ID</span>',
    'noid': '可能不能提供ID'
};

export function conditionLang(params/*, hash*/) {

    return langs[params[0]];
}

export default helper(conditionLang);
