import dictConfig from './dict-config';
import autocompleteConfig from './autocomplete-config';
import treeConfig from './tree-config';
import categoryConfig from './category-config';

const heyuiConfig = () => {
    const staticDict = dictConfig();
    Object.keys(staticDict).forEach((key) => {
        HeyUI.addDict(key, staticDict[key]);
    });

    HeyUI.config('menu', {
        keyName: 'key',
        titleName: 'title',
        childrenName: 'children'
    });
};

export default heyuiConfig;