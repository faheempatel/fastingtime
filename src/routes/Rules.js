import { h } from 'preact';
import styled from 'preact-emotion';
import { route } from 'preact-router';

import backIcon from '../assets/icons/back.svg';
import { CONTAINER_VARIANTS } from '../components/variants';

import { make as Container } from '../components/layout/container';
import NavBar from '../components/NavBar';

const Card = styled('div')`
  margin-top: 16px;
  padding: 16px;
  padding-bottom: 18px;
  border-radius: 8px;
`;

const Green = styled(Card)`
  background-color: #d4edda;
  color: #155724;
  .description {
    color: #536d59;
  }
`;

const Red = styled(Card)`
  background-color: #f8d7da;
  color: #721c24;
  .description {
    color: #865458;
  }
`;

const Heading = styled('h2')`
  margin-top: 4px;
  margin-bottom: 24px;
  font-weight: 800;
`;

const GreenHeading = styled(Heading)`
  color: #155724;
`;

const RedHeading = styled(Heading)`
  color: #721c24;
`;

const Item = styled('li')`
  margin-bottom: 24px;
`;

const Title = styled('p')`
  margin-bottom: 4px;
  font-weight: 700;
  line-height: 1.3;
`;

const Link = styled('a')`
  color: var(--black);
`;

const Note = styled(Card)`
  background-color: #fff3cd;
  color: rgb(161 98 7);

  a {
    color: rgb(113 63 18);
  }
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
        'Similarly, engaging in these acts before Maghrib (sunset) on the mistaken assumption that it is already Maghrib time'
    }
  ]
};

export default () => {
  const renderList = rules => (
    <ul>
      {rules.map(rule => (
        <Item>
          <Title>{rule.title}</Title>
          {rule.description ? (
            <p className="description">{rule.description}</p>
          ) : null}
        </Item>
      ))}
    </ul>
  );

  return (
    <Container variant={CONTAINER_VARIANTS.SCROLL}>
      <NavBar
        title={'Fasting Rules'}
        icon={backIcon}
        onClick={() => route('/')}
      />
      <Note>
        <p>
          This is a quick reference, for the full guide please read:{' '}
          <Link href="http://www.iccuk.org/downloads/Introduction_to_Fasting.pdf">
            The Brief Introduction to Ramadan Fasting
          </Link>
          .
        </p>
      </Note>

      <Green>
        <GreenHeading>Things that are ok</GreenHeading>
        {renderList(rules.allowed)}
      </Green>

      <Red>
        <RedHeading>Things that break our fast</RedHeading>
        {renderList(rules.disallowed)}
      </Red>
    </Container>
  );
};
