'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { actions as heroesActions } from '@/lib/features/heroes/heroesSlice';
import { actions as graphActions } from '@/lib/features/graph/graphSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from './components/Loader';
import { Hero } from './types/Hero';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Node,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import {
  primaryAxis,
  secondaryAxis,
  stepBetweenPrimary,
  stepBetweenSecondary,
} from './constants/graphConstants';
import 'reactflow/dist/style.css';
import { ModalView } from './components/ModalView';
import { HeroList } from './components/HeroList';
import { generateFilmNodes } from './utils/graphHelper/generateFilmNodes';
import { generateStarshipsNodes } from './utils/graphHelper/generateStarshipsNodes';
import { generateHeroFilmEdges } from './utils/graphHelper/generateHeroFilmEdges';
import { generateFilmStarshipEdges } from './utils/graphHelper/generateFilmStarshipEdges';
import { large, middle } from './constants/screenSizeBreakpoints';
import { ErrorMessage } from './components/ErrorMessage';

export default function Home() {
  const dispatch = useAppDispatch();
  const { heroes, next, status } = useAppSelector((state) => state.heroes);
  const {
    hero,
    films,
    starships,
    status: graphInfoStatus,
  } = useAppSelector((state) => state.graph);
  const [isModalShown, setIsModalShown] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // The loader is shown when there are no heroes and the status is not 'failed'
  const isLoaderShown = heroes.length === 0 && status !== 'failed';

  // The list is shown when the loader is not shown and the status is not 'failed'
  const isListShown = !isLoaderShown && status !== 'failed';

  // The heroes list error is shown when the status is 'failed'
  const isHeroesListErrorShown = status === 'failed';

  // The graph error is shown when the graphInfoStatus is 'failed'
  const isGraphErrorShown = graphInfoStatus === 'failed';

  // The graph is shown when the graphInfoStatus is 'idle'
  const isGraphShown = graphInfoStatus === 'idle';

  // The graph loader is shown when the graphInfoStatus is 'loading'
  const isGraphLoaderShown = graphInfoStatus === 'loading';

  // It shows the modal and, if the clicked hero is not the current hero
  // or the previous graph info fetch was failed,
  // sets the current hero and fetches the graph info for the clicked hero
  const onHeroCardClick = (newHero: Hero) => {
    setIsModalShown(true);

    if (newHero.name !== hero?.name || graphInfoStatus === 'failed') {
      dispatch(graphActions.setHero(newHero));

      dispatch(graphActions.fetchGraphInfo(newHero));
    }
  };

  // This function is called when the modal is clicked outside
  // It hides the modal
  const handleModalClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target == event.currentTarget) {
      setIsModalShown(false);
    }
  };

  // This hook is called when the hero state changes
  // If the hero state is null, it returns immediately
  useEffect(() => {
    if (!hero) {
      return;
    }

    // Generate nodes for the films, starships, and hero
    const filmNodes = generateFilmNodes(
      films,
      stepBetweenPrimary,
      primaryAxis,
      secondaryAxis,
      stepBetweenSecondary
    );
    const starshipNodes = generateStarshipsNodes(
      starships,
      stepBetweenPrimary * 2,
      primaryAxis,
      secondaryAxis,
      stepBetweenSecondary
    );
    const heroNode: Node = {
      id: 'hero',
      position: { x: 0, y: 0 },
      data: { label: hero?.name },
      sourcePosition: primaryAxis === 'x' ? Position.Right : Position.Bottom,
    };

    // Generate edges between the hero and the films and between the films and the starships
    const heroFilmEdges = generateHeroFilmEdges(films);
    const filmStarshipEdges = generateFilmStarshipEdges(films, starships);

    // Set the nodes and edges in the state
    setNodes([...filmNodes, ...starshipNodes, heroNode]);
    setEdges([...heroFilmEdges, ...filmStarshipEdges]);
  }, [films, starships]);

  // It fetches the initial heroes
  // It fetches necessary amount of pages based on current screen size
  // to fill the InfinityScroll list
  useEffect(() => {
    const windowWidth = window.innerWidth;

    switch (true) {
      case windowWidth > large:
        dispatch(heroesActions.fetchHeroes(3));
        break;

      case windowWidth > middle:
        dispatch(heroesActions.fetchHeroes(2));
        break;

      default:
        dispatch(heroesActions.fetchHeroes(1));
        break;
    }
  }, []);

  // Fetches more heroes when called
  const fetchMoreData = async () => {
    dispatch(heroesActions.fetchHeroes(1));
  };

  return (
    <>
      <h1 className='mt-4 text-4xl font-extrabold leading-none tracking-tight text-center text-gray-900 mb-7 md:text-5xl lg:text-6xl'>
        Star Wars heroes
      </h1>
      {isLoaderShown && <Loader />}

      {isListShown && (
        //  @ts-ignore
        <InfiniteScroll
          dataLength={heroes.length}
          next={fetchMoreData}
          hasMore={!!next}
          loader={<Loader />}
          style={{ overflow: 'hidden' }}
        >
          <HeroList heroes={heroes} onHeroCardClick={onHeroCardClick} />
        </InfiniteScroll>
      )}

      {isHeroesListErrorShown && (
        <div className='flex justify-center'>
          <div className='max-w-fit'>
            <ErrorMessage
              title='Request failed'
              message='Failed to load heroes'
            />
          </div>
        </div>
      )}

      <ModalView
        isModalShown={isModalShown}
        handleClickOutside={handleModalClickOutside}
        handleModalClose={() => setIsModalShown(false)}
        title={hero!.name}
      >
        {isGraphLoaderShown && <Loader />}

        {isGraphShown && (
          <ReactFlow
            fitView
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        )}

        {isGraphErrorShown && (
          <ErrorMessage
            title='Request failed'
            message='Failed to load graph info'
          />
        )}
      </ModalView>
    </>
  );
}
