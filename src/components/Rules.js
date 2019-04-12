import { h } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';

import backIconUrl from '../assets/icons/back.svg';

import Container from './Container';
import NavBar from './NavBar';

const Heading = styled('h2')`
  margin-top: 32px;
  margin-bottom: 24px;
  font-weight: 800;
  color: ${props => (props.disallowedColor ? '#f63433' : '#7dbc4b')};
`;

const Item = styled('li')`
  margin-bottom: 24px;
`;

const Title = styled('p')`
  margin-bottom: 4px;
  font-weight: 700;
  line-height: 1.3;
`;

const Description = styled('p')`
  color: var(--grey);
`;

const rules = {
  allowed: [
    {
      title: 'Using miswak or toothbrush (even with toothpaste)',
      description: 'Be careful not to swallow or overdo it'
    },
    {
      title: 'Eating or drinking unintentionally',
      description:
        'i.e. forgetting that you were fasting. But you must stop as soon as you realise and continue with your fast'
    },
    {
      title: 'Rinsing the mouth or nostrils with water',
      description:
        'Provided it is not overdone (so as to avoid swallowing water)'
    },
    {
      title: 'Swallowing your own saliva'
    },
    {
      title: 'Having an injection'
    },
    {
      title: 'Using perfumes, wearing contact lenses or using eye drops'
    }
  ],
  disallowed: [
    {
      title: 'Eating or drinking deliberately',
      description:
        'This includes taking any non-nourishing items by mouth or nose'
    },
    {
      title: 'Deliberately causing yourself to vomit'
    },
    {
      title: 'The beginning of menstrual or post-childbirth bleeding',
      description: 'Even if it occurs in the last moments before sunset'
    },
    {
      title:
        'Eating, drinking, smoking or having sexual intercourse after Fajr (dawn) on the mistaken assumption that it is not Fajr time yet',
      description:
        ' Similarly, engaging in these acts before Maghrib (sunset) on the mistaken assumption that it is already Maghrib time'
    }
  ]
};

export default () => (
  <Container>
    <NavBar
      title={'Fasting Rules'}
      icon={backIconUrl}
      onClick={() => route('/')}
    />
    <Heading>Things that are ok</Heading>
    <ul>
      {rules.allowed.map(rule => (
        <Item>
          <Title>{rule.title}</Title>
          {rule.description ? (
            <Description>{rule.description}</Description>
          ) : null}
        </Item>
      ))}
    </ul>
    <Heading disallowedColor={true}>Things that break our fast</Heading>
    <ul>
      {rules.disallowed.map(rule => (
        <Item>
          <Title>{rule.title}</Title>
          {rule.description ? (
            <Description>{rule.description}</Description>
          ) : null}
        </Item>
      ))}
    </ul>
  </Container>
);
