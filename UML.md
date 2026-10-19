# UML

**## EquipmentDefinition**

Variaveis:
  + Id: string;
  + DisplayName: string;
  - Description: [TextArea] public string;
  + Icon: Sprite;
  + _WeaponData: WeaponData;
  + CraftCosts: List<EquipmentCraftCostData>;
  + UpgradeLevels: List<EquipmentUpgradeData>;
  + EquipmentType: EquipmentType;
  + ElementType: ElementType;
  + RuneSlots: List<RuneSlotType>;
  + IntrinsicPerks: List<PerkDefinition>;

Funções:

Conexões:

**## BuildCalculationService**

Variaveis:
  - profile: PlayerProfileData;

Funções:
  + Recalculate()

Conexões:
  EquipmentService,
  GameServices,
  PlayerBuildData,
  PlayerProfileData,

Chamadas:
  BuildCalculationService.Recalculate() -> BuildCalculationService.CalculateBaseStats()
  BuildCalculationService.Recalculate() -> BuildCalculationService.CalculateEquipment()
  BuildCalculationService.Recalculate() -> BuildCalculationService.CalculateRunes()
  BuildCalculationService.Recalculate() -> BuildCalculationService.CalculateConsumables()
  RPC_Teste.RPC_SetPlayerActiveBuildResult() -> BuildCalculationService.Recalculate()
  RPC_Teste.UpdateLocalBuild() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_EquipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerEquipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_UnequipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerUnequipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_EquipRune() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerEquipRune() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_UnequipRune() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerUnequipRune() -> BuildCalculationService.Recalculate()

**## EquipmentService**

Variaveis:
  - _database: readonly IEquipmentRepository;
  - _progression: readonly EquipmentProgressionDatabase;

Funções:
  + HasEquipment()
  + GetById()

Conexões:
  EquipmentDefinition,
  PlayerProfileData,

Chamadas:
  EquipmentService.HasEquipment() -> EquipmentService.TryGetPlayerquipamentData()
  EquipmentService.UnlockEquipment() -> EquipmentService.TryGetPlayerquipamentData()
  EquipmentService.UnlockEquipment() -> EquipmentService.GetById()
  EquipmentService.TryGetEquipment() -> EquipmentService.TryGetPlayerquipamentData()
  EquipmentService.GetEquipmentLevel() -> EquipmentService.TryGetPlayerquipamentData()
  EquipmentService.CanUpgrade() -> EquipmentService.TryGetPlayerquipamentData()
  EquipmentService.UpgradeEquipment() -> EquipmentService.TryGetPlayerquipamentData()
  EquipmentService.GetProgression() -> EquipmentService.GetEquipmentLevel()
  EquipmentService.ApplyStats() -> EquipmentService.GetProgression()
  GameServices.InitializeRepositorys() -> EquipmentService.EquipmentService()
  RPC_Teste.RPC_EquipAnEquipment() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_EquipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerEquipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_UnequipAnEquipment() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_UnequipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerUnequipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_EquipRune() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_EquipRune() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerEquipRune() -> EquipmentService.GetById()
  RPC_Teste.RPC_UnequipRune() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_UnequipRune() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerUnequipRune() -> EquipmentService.GetById()
  BuildViewModel.EquipAnEquipment() -> EquipmentService.GetById()
  BuildViewModel.GetBuildEquipments() -> EquipmentService.HasEquipment()
  BuildViewModel.GetBuildEquipments() -> EquipmentService.GetById()
  BuildViewModel.GetPlayerEquipmentStats() -> EquipmentService.GetById()
  BuildViewModel.GetPlayerEquipmentStats() -> EquipmentService.GetEquipAttackByLevel()
  BuildViewModel.GetPlayerEquipmentStats() -> EquipmentService.GetEquipDeffenseByLevel()
  BuildViewModel.GetPlayerOwnedEquips() -> EquipmentService.GetEquipamentsByType()
  BuildViewModel.GetEquipmentSelectionItemStats() -> EquipmentService.GetById()
  BuildViewModel.GetEquipmentSelectionItemStats() -> EquipmentService.GetProgression()
  BuildViewModel.GetPlayerAvailableRunes() -> EquipmentService.GetById()

**## GameServices**

Variaveis:

Funções:

Conexões:
  BuildCalculationService,
  EquipmentService,

Chamadas:
  GameServices.Spawned() -> GameServices.InitializeRepositorys()
  GameServices.Spawned() -> GameServices.InitializeSettingsServices()
  GameServices.InitializeRepositorys() -> EquipmentService.EquipmentService()

**## RPC_Teste**

Variaveis:

Funções:
  + RPC_SetPlayerActiveBuildResult()
  + RPC_SetPlayerActiveBuild()
  - UpdateLocalBuild()
  + RPC_EquipAnEquipment()
  + RPC_PlayerEquipAnEquipment()
  + RPC_UnequipAnEquipment()
  + RPC_PlayerUnequipAnEquipment()
  + RPC_EquipRune()
  + RPC_PlayerEquipRune()
  + RPC_UnequipRune()
  + RPC_PlayerUnequipRune()

Conexões:
  EquipmentDefinition,
  BuildCalculationService,
  EquipmentService,
  GameServices,
  ConnectionHandler,
  PlayerRoot,
  PlayerBuildLoader,
  PlayerBuildData,
  PlayerProfileData,

Chamadas:
  RPC_Teste.RPC_SetPlayerActiveBuildResult() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_SetPlayerActiveBuild() -> RPC_Teste.RPC_SetPlayerActiveBuildResult()
  RPC_Teste.RPC_SetPlayerActiveBuildResult() -> RPC_Teste.UpdateLocalBuild()
  RPC_Teste.UpdateLocalBuild() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_EquipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_EquipAnEquipment() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_EquipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_EquipAnEquipment() -> RPC_Teste.RPC_PlayerEquipAnEquipment()
  RPC_Teste.RPC_EquipAnEquipment() -> BuildViewModel.EquipAnEquipment()
  RPC_Teste.RPC_PlayerEquipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerEquipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerEquipAnEquipment() -> BuildViewModel.EquipAnEquipment()
  RPC_Teste.RPC_UnequipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_UnequipAnEquipment() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_UnequipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_UnequipAnEquipment() -> RPC_Teste.RPC_PlayerUnequipAnEquipment()
  RPC_Teste.RPC_UnequipAnEquipment() -> BuildViewModel.UnequipAnEquipment()
  RPC_Teste.RPC_PlayerUnequipAnEquipment() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerUnequipAnEquipment() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerUnequipAnEquipment() -> BuildViewModel.UnequipAnEquipment()
  RPC_Teste.RPC_EquipRune() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_EquipRune() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_EquipRune() -> EquipmentService.GetById()
  RPC_Teste.RPC_EquipRune() -> RPC_Teste.RPC_PlayerEquipRune()
  RPC_Teste.RPC_EquipRune() -> BuildViewModel.EquipRune()
  RPC_Teste.RPC_PlayerEquipRune() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerEquipRune() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerEquipRune() -> BuildViewModel.EquipRune()
  RPC_Teste.RPC_UnequipRune() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_UnequipRune() -> EquipmentService.HasEquipment()
  RPC_Teste.RPC_UnequipRune() -> EquipmentService.GetById()
  RPC_Teste.RPC_UnequipRune() -> RPC_Teste.RPC_PlayerUnequipRune()
  RPC_Teste.RPC_UnequipRune() -> BuildViewModel.UnequipRune()
  RPC_Teste.RPC_PlayerUnequipRune() -> BuildCalculationService.Recalculate()
  RPC_Teste.RPC_PlayerUnequipRune() -> EquipmentService.GetById()
  RPC_Teste.RPC_PlayerUnequipRune() -> BuildViewModel.UnequipRune()
  PlayerRoot.SetPlayerBuild() -> RPC_Teste.RPC_SetPlayerActiveBuildResult()
  BuildViewModel.SelectBuild() -> RPC_Teste.RPC_SetPlayerActiveBuild()
  BuildViewModel.EquipAnEquipment() -> RPC_Teste.RPC_EquipAnEquipment()
  BuildViewModel.UnequipAnEquipment() -> RPC_Teste.RPC_UnequipAnEquipment()
  BuildViewModel.EquipRune() -> RPC_Teste.RPC_EquipRune()
  BuildViewModel.UnequipRune() -> RPC_Teste.RPC_UnequipRune()

**## ConnectionHandler**

Variaveis:
  - instanciated: bool;
  - runnerPrefab: NetworkRunner;
  - runner: NetworkRunner;
  - localPlayerInput: PlayerInputHandler;
  - networkEvents: NetworkEvents;
  - cachedInputData: NetworkInputData;
  + Runner: NetworkRunner;

Funções:

Conexões:

Chamadas:
  ConnectionHandler.StartConnectionAsync() -> ConnectionHandler.DisconnectAsync()
  ConnectionHandler.StartConnectionAsync() -> ConnectionHandler.CleanupRunnerObject()
  ConnectionHandler.DisconnectAsync() -> ConnectionHandler.CleanupRunnerObject()

**## PlayerRoot**

Variaveis:

Funções:
  + SetPlayerBuild()

Conexões:
  RPC_Teste,
  PlayerProfileData,

Chamadas:
  PlayerRoot.SetPlayerBuild() -> RPC_Teste.RPC_SetPlayerActiveBuildResult()

**## PlayerBuildLoader**

Variaveis:
  - _debugBootstrapGO: GameObject;
  - _debugBootstrap: BuildDebugBootstrap;
  - _useDebugBootstrap: bool;
  - Profile: PlayerProfileData;

Funções:

Conexões:
  PlayerBuildData,
  PlayerProfileData,

Chamadas:
  PlayerBuildLoader.PlayerBuildLoader() -> PlayerBuildLoader.LoadDebugData()

**## BuildViewModel**

Variaveis:
  + PlayerProfileData: ObservableValue<PlayerProfileData>;
  - _buildService: PlayerBuildService;
  - _BuildCalculationService: BuildCalculationService;
  - _validation: BuildValidationService;
  - _runeService: RuneService;
  - playerBuilds: [SerializeField] private List<PlayerBuildData>;

Funções:
  + SelectBuild()
  + EquipAnEquipment()
  + UnequipAnEquipment()
  + EquipRune()
  + UnequipRune()

Conexões:
  EquipmentDefinition,
  BuildCalculationService,
  EquipmentService,
  GameServices,
  RPC_Teste,
  PlayerRoot,
  PlayerBuildData,
  PlayerProfileData,

Chamadas:
  RPC_Teste.RPC_EquipAnEquipment() -> BuildViewModel.EquipAnEquipment()
  RPC_Teste.RPC_PlayerEquipAnEquipment() -> BuildViewModel.EquipAnEquipment()
  RPC_Teste.RPC_UnequipAnEquipment() -> BuildViewModel.UnequipAnEquipment()
  RPC_Teste.RPC_PlayerUnequipAnEquipment() -> BuildViewModel.UnequipAnEquipment()
  RPC_Teste.RPC_EquipRune() -> BuildViewModel.EquipRune()
  RPC_Teste.RPC_PlayerEquipRune() -> BuildViewModel.EquipRune()
  RPC_Teste.RPC_UnequipRune() -> BuildViewModel.UnequipRune()
  RPC_Teste.RPC_PlayerUnequipRune() -> BuildViewModel.UnequipRune()
  BuildViewModel.SelectBuild() -> RPC_Teste.RPC_SetPlayerActiveBuild()
  BuildViewModel.EquipAnEquipment() -> EquipmentService.GetById()
  BuildViewModel.EquipAnEquipment() -> RPC_Teste.RPC_EquipAnEquipment()
  BuildViewModel.UnequipAnEquipment() -> RPC_Teste.RPC_UnequipAnEquipment()
  BuildViewModel.GetBuildEquipments() -> EquipmentService.HasEquipment()
  BuildViewModel.GetBuildEquipments() -> EquipmentService.GetById()
  BuildViewModel.GetPlayerEquipmentStats() -> EquipmentService.GetById()
  BuildViewModel.GetPlayerEquipmentStats() -> EquipmentService.GetEquipAttackByLevel()
  BuildViewModel.GetPlayerEquipmentStats() -> EquipmentService.GetEquipDeffenseByLevel()
  BuildViewModel.GetPlayerOwnedEquips() -> EquipmentService.GetEquipamentsByType()
  BuildViewModel.GetPlayerOwnedEquips() -> BuildViewModel.GetEquipmentSelectionItemStats()
  BuildViewModel.GetEquipmentSelectionItemStats() -> EquipmentService.GetById()
  BuildViewModel.GetEquipmentSelectionItemStats() -> EquipmentService.GetProgression()
  BuildViewModel.GetEquipmentSelectionItemStats() -> BuildViewModel.GetPlayerEquipmentStats()
  BuildViewModel.GetPlayerAvailableRunes() -> EquipmentService.GetById()
  BuildViewModel.EquipRune() -> RPC_Teste.RPC_EquipRune()
  BuildViewModel.UnequipRune() -> RPC_Teste.RPC_UnequipRune()

**## PlayerBuildData**

Variaveis:
  + BuildId: string;
  + BuildName: string;
  + EquippedEquipments: List<EquipmentSlotData>;
  + EquippedRunes: List<RuneSlotData>;
  + EquippedConsumables: List<ConsumableSlotData>;

Funções:

Conexões:

**## PlayerProfileData**

Variaveis:
  + OnChanged: Action<PlayerProfileData>;

Funções:

Conexões:
