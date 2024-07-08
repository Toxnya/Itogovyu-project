import { importAll } from '../../components/utils';

const images = importAll(require.context('Z:\\itogovyi_project\\src\\frontend\\images', false, /\.(png|jpe?g|svg)$/));

const heroes = [
    {
        id: 'jiyan',
        image: images['super_jiyan-2b4d6442.png'],
        avatar: images['nav-role-jiyan-880cc3f3.png'],
        icon: images['anemo.png'],
    },
    {
        id: 'yinlin',
        image: images['super_yinlin-e98ed545.png'],
        avatar: images['nav-role-yinlin-4359a950.png'],
        icon: images['electro.png'],
    },
    {
        id: 'jianxin',
        image: images['super_jianxin-7ae51570.png'],
        avatar: images['nav-role-jianxin-e8a5d783.png'],
        icon: images['pyro.png'],
    },
    {
        id: 'verina',
        image: images['super_weilinai-fb41e537.png'],
        avatar: images['nav-role-weilinai-61bf0f50.png'],
        icon: images['spetcro.png'],
    },
    {
        id: 'encore',
        image: images['super_anke-968ed264.png'],
        avatar: images['nav-role-anke-2b178fec.png'],
        icon: images['pyro.png'],
    },
    {
        id: 'lingyang',
        image: images['super_lingyang-699f1f98.png'],
        avatar: images['nav-role-lingyang-c2625456.png'],
        icon: images['cryo.png'],
    },
    {
        id: 'calcharo',
        image: images['super_kakaluo-19b02a23.png'],
        avatar: images['nav-role-kakaluo-d8663151.png'],
        icon: images['pyro.png'],
    },
];

export default heroes;
