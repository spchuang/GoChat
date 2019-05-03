// @flow

'use strict';

import GK from './GK';
import User from '../class/User';

const GoGating = {
  useNewCreateFlow: (user: User): boolean => {
    return GK.forGKAndUser('new_create_game_flow', user);
  },
  canPlayWithAI: (user: User): boolean => {
    return GK.forGKAndUser('play_with_ai', user);
  },
};

module.exports = GoGating;
