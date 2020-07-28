import React from "react";
import { Card, Layout, Typography } from "antd";

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = () => {
    return (
        <Content className="log-in">
            <Card className="log-in-card">
                <div className="log-in-card__intro">
                    <Title level={3} className="log-in-card__intro-title">
                        <span role="img" aria-label="wave">👋</span>
                    </Title>
                    <Title level={3} className="log-in-card__intro-title">
                        Log in to TinyHouse!
                    </Title>
                    <Text>Sign in with Google to start booking available rentals!</Text>
                </div>
                <button className="log-in-card__google-button">
                    <img src="https://d2uusema5elisf.cloudfront.net/courses/tinyhouse-react-masterclass-part-2/module_4/lesson_4.6/public/assets/google_logo.jpg" alt="Google logo" className="logo-in-card__google-button-logo"/>
                    <span className="log-in-card__google-button-text">
                        Sign in with Google
                    </span>
                </button>
                <Text type="secondary">Note: By signing in, you'll br redirected to the Google consent form to sign in with your Google account.</Text>
            </Card>
        </Content>
    )
}