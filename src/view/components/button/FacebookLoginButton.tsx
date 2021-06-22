import FacebookLogin from 'react-facebook-login';
import React, { Component, FC } from 'react';
import { APP_CONFIG } from 'src/config';
export const FacebookLoginButton: FC = () => {
    const handleSuccess: (res: any) => Promise<void> = async res => {
        try {
            console.log(res);
        } catch (e) {
            // eslint-disable-next-line
            console.error('error', e);
        }
    };

    return (
        <FacebookLogin
            appId={APP_CONFIG.FACEBOOK_APP_ID}
            fields="name,email,picture"
            callback={handleSuccess}
            // tag={(renderProps: any): Node | React.Component<any, {}, any> => (
            //     <button
            //         type="button"
            //         onClick={renderProps.onClick}
            //         className="w-30px h-30px ml-4 flex items-center justify-center"
            //     >
            //         Login
            //     </button>
            // )}
        />
    );
};
