const INT32MIN = -2147483648;
const INT32MAX = 2147483647;
const UINT32MAX = 4294967295;
const UINT16MAX = 65535;
const PI_2 = 2 * Math.PI;

/**
 * @param {Settings} settings
 */
module.exports = (settings) => {
    settings.register({ id: "listenerBlacklistedIPs",          type: "set"   , default: []                                                });
    settings.register({ id: "listenerWhitelistedIPs",          type: "set"   , default: []                                                });
    settings.register({ id: "listenerAcceptedOrigins",         type: "set"   , default: []                                                });
    settings.register({ id: "listenerMaxConnections",          type: "int"   , default: 64       , minimum: 0                             });
    settings.register({ id: "listenerMaxClientDormancy",       type: "int"   , default: 1000 * 60, minimum: 0                             });
    settings.register({ id: "listenerMaxConnectionsPerIP",     type: "int"   , default: -1       , minimum: -1                            });
    settings.register({ id: "listenerMinLegacyProtocol",       type: "int"   , default: 1        , minimum: 1        , maximum: 18        });
    settings.register({ id: "listenerMaxLegacyProtocol",       type: "int"   , default: 18       , minimum: 1        , maximum: 18        });
    settings.register({ id: "listenerPort",                    type: "int"   , default: 443      , minimum: 1        , maximum: 65535     });

    settings.register({ id: "serverUpdateFrequency",           type: "int"   , default: 25       , minimum: 1        , maximum: 200       });
    settings.register({ id: "serverName",                      type: "string", default: "An unnamed server"                               });
    settings.register({ id: "serverGamemode",                  type: "string", default: "FFA"                                             });
    settings.register({ id: "serverChatEnabled",               type: "bool"  , default: true                                              });

    settings.register({ id: "worldMapX",                       type: "float" , default: 0        , minimum: INT32MIN , maximum: INT32MAX  });
    settings.register({ id: "worldMapY",                       type: "float" , default: 0        , minimum: INT32MIN , maximum: INT32MAX  });
    settings.register({ id: "worldMapW",                       type: "float" , default: 7071     , minimum: 0        , maximum: UINT32MAX });
    settings.register({ id: "worldMapH",                       type: "float" , default: 7071     , minimum: 0        , maximum: UINT32MAX });
    settings.register({ id: "worldFinderMaxLevel",             type: "int"   , default: 16       , minimum: 1                             });
    settings.register({ id: "worldFinderMaxItems",             type: "int"   , default: 16       , minimum: 1                             });
    settings.register({ id: "worldSafeSpawnTries",             type: "int"   , default: 16       , minimum: 1                             });
    settings.register({ id: "worldSafeSpawnFromEjectedChance", type: "float" , default: 0.8      , minimum: 0        , maximum: 1         });
    settings.register({ id: "worldPlayerDisposeDelay",         type: "int"   , default: 25 * 60  , minimum: -1                            });

    settings.register({ id: "worldPlayerBotsPerWorld",         type: "int"   , default: 0        , minimum: 0                             });
    settings.register({ id: "worldMinionsPerPlayer",           type: "int"   , default: 0        , minimum: 0                             });
    settings.register({ id: "worldMaxPlayers",                 type: "int"   , default: 64       , minimum: 0                             });
    settings.register({ id: "worldMinCount",                   type: "int"   , default: 0        , minimum: 0                             });
    settings.register({ id: "worldMaxCount",                   type: "int"   , default: 1        , minimum: 1                             });
    settings.register({ id: "matchmakerNeedsQueuing",          type: "bool"  , default: false                                             });
    settings.register({ id: "matchmakerBulkSize",              type: "int"   , default: 1        , minimum: 1                             });

    settings.register({ id: "minionName",                      type: "string", default: "Minion"                                          });
    settings.register({ id: "minionSpawnSize",                 type: "float" , default: 32       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "minionEnableERTPControls",        type: "bool"  , default: false                                             });
    settings.register({ id: "minionEnableQBasedControl",       type: "bool"  , default: true                                              });

    settings.register({ id: "pelletMinSize",                   type: "float" , default: 10       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "pelletMaxSize",                   type: "float" , default: 20       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "pelletGrowTicks",                 type: "int"   , default: 25 * 60  , minimum: 1                             });
    settings.register({ id: "pelletCount",                     type: "int"   , default: 1000     , minimum: 0                             });

    settings.register({ id: "virusMinCount",                   type: "int"   , default: 30       , minimum: 0                             });
    settings.register({ id: "virusMaxCount",                   type: "int"   , default: 90       , minimum: 0                             });
    settings.register({ id: "virusSize",                       type: "float" , default: 100      , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "virusFeedTimes",                  type: "int"   , default: 7        , minimum: 1                             });
    settings.register({ id: "virusPushing",                    type: "bool"  , default: false                                             });
    settings.register({ id: "virusSplitBoost",                 type: "float" , default: 780      , minimum: 0                             });
    settings.register({ id: "virusPushBoost",                  type: "float" , default: 90       , minimum: 0                             });
    settings.register({ id: "virusMonotonePops",               type: "bool"  , default: false                                             });

    settings.register({ id: "ejectedSize",                     type: "float" , default: 43       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "ejectedLoss",                     type: "float" , default: 48       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "ejectedDispersion",               type: "float" , default: PI_2 / 24, minimum: 0        , maximum: PI_2      });
    settings.register({ id: "ejectedBoost",                    type: "float" , default: 780      , minimum: 0                             });

    settings.register({ id: "mothercellMinSize",               type: "float" , default: 149      , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "mothercellMaxSize",               type: "float" , default: UINT16MAX, minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "mothercellCount",                 type: "int"   , default: 0        , minimum: 0                             });
    settings.register({ id: "mothercellPassiveSpawnChance",    type: "float" , default: 0.05     , minimum: 0        , maximum: 1         });
    settings.register({ id: "mothercellActiveSpawnSpeed",      type: "float" , default: 1        , minimum: 0.01     , maximum: 1         });
    settings.register({ id: "mothercellPelletBoost",           type: "float" , default: 90       , minimum: 0                             });
    settings.register({ id: "mothercellMaxPelletCount",        type: "int"   , default: 0        , minimum: 0                             });

    settings.register({ id: "playerRoamSpeed",                 type: "float" , default: 32       , minimum: 0                             });
    settings.register({ id: "playerRoamViewScale",             type: "float" , default: 0.4      , minimum: 0.001                         });
    settings.register({ id: "playerViewScaleMult",             type: "float" , default: 1        , minimum: 0                             });
    settings.register({ id: "playerMaxNameLength",             type: "int"   , default: 16       , minimum: 0                             });

    settings.register({ id: "playerMinSize",                   type: "float" , default: 32       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "playerSpawnSize",                 type: "float" , default: 32       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "playerMaxSize",                   type: "float" , default: 1500     , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "playerMinSplitSize",              type: "float" , default: 60       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "playerMinEjectSize",              type: "float" , default: 60       , minimum: 1        , maximum: UINT16MAX });
    settings.register({ id: "playerMaxCells",                  type: "int"   , default: 16       , minimum: 1                             });

    settings.register({ id: "playerMoveMult",                  type: "float" , default: 1        , minimum: 0                             });
    settings.register({ id: "playerSplitBoost",                type: "float" , default: 780      , minimum: 0                             });
    settings.register({ id: "playerNoCollideDelay",            type: "int"   , default: 13       , minimum: 0                             });
    settings.register({ id: "playerNoMergeDelay",              type: "int"   , default: 15       , minimum: 0                             });
    settings.register({ id: "playerMergeVersion",              type: "option", default: "old"    , options: [ "old", "new" ]              });
    settings.register({ id: "playerMergeTime",                 type: "int"   , default: 30       , minimum: 0                             });
    settings.register({ id: "playerMergeTimeIncrease",         type: "float" , default: 0.02     , minimum: 0                             });
    settings.register({ id: "playerDecayMult",                 type: "float" , default: 0.002    , minimum: 0                             });
};

const Settings = require("./Settings");
