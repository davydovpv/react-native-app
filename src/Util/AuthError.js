import AmplifyMessageMap from './AmplifyMessageMap';

export const AuthError = (err) => {

    if (typeof err === 'string') {
        msg = err;
    } else if (err.message) {
        msg = err.message;
    } else {
        msg = JSON.stringify(err);
    }

    const map = AmplifyMessageMap;
    msg = (typeof map === 'string')? map : map(msg);

    return msg

}
