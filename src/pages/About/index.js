import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function About() {
    return (
        <Typography>
            <Card title={<h3>About Us</h3>}>
                <Paragraph>
                    In the process of internal desktop applications development, many different design specs and
                    implementations would be involved, which might cause designers and developers difficulties and
                    duplication and reduce the efficiency of development.
                </Paragraph>
                <Paragraph>
                    After massive project practice and summaries, Ant Design, a design language for background
                    applications, is refined by Ant UED Team, which aims to
                    <Text strong>
                        uniform the user interface specs for internal background projects, lower the unnecessary
                        cost of design differences and implementation and liberate the resources of design and
                        front-end development
                    </Text>.
                </Paragraph>
                <Title level={2}>Guidelines and Resources</Title>
                <Paragraph>
                    We supply a series of design principles, practical patterns and high quality design resources
                    (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
                    prototypes beautifully and efficiently.
                </Paragraph>

                <Paragraph>
                    <ul>
                        <li>
                        <a href="/docs/spec/proximity">Principles</a>
                        </li>
                        <li>
                        <a href="/docs/pattern/navigation">Patterns</a>
                        </li>
                        <li>
                        <a href="/docs/resource/download">Resource Download</a>
                        </li>
                    </ul>
                </Paragraph>
            </Card>
        </Typography>
    )
}
