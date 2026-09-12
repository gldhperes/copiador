# UML

**## CombatEvent**

Variaveis:

Funções:
  + CombatEvent()

Conexões:

**## CombatEventDispatcher**

Variaveis:
  - _instance: static readonly CombatEventDispatcher;
  + Instance: static CombatEventDispatcher;
  + OnEvent: event Action<CombatEvent>;

Funções:
  - new()
  - CombatEventDispatcher()
  + Publish()

Conexões:
  CombatEvent,

**## ObservableValue**

Variaveis:
  - _value: T;
  + OnChanged: event Action<T>;

Funções:
  + ObservableValue()

Conexões:

**## BuildDebugBootstrap**

Variaveis:
  + OwnedEquipments: List<OwnedEquipmentData>;
  + OwnedRunes: List<OwnedRuneData>;
  + OwnedConsumables: List<OwnedConsumableData>;
  + Builds: List<BuildDebugData>;

Funções:
  - Header()
  + new()
  - Header()
  + new()
  - Header()
  + new()
  - Header()
  + new()

Conexões:
  BuildDebugData,
  EquipmentDatabase,
  RuneDatabase,
  ConsumableDatabase,
  OwnedConsumableData,
  OwnedEquipmentData,
  OwnedRuneData,

**## BuildDebugData**

Variaveis:
  + BuildName: string;
  + EquippedEquipments: List<EquipmentSlotData>;
  + EquippedRunes: List<RuneSlotData>;

Funções:
  + new()
  + new()
  + new()

Conexões:
  ConsumableSlotData,
  EquipmentSlotData,
  RuneSlotData,

**## BuildDebugRunner**

Variaveis:
  - _bootstrap: BuildDebugBootstrap;
  - _buildService: PlayerBuildService;

Funções:
  - Awake()
  - ContextMenu()
  + PopulateProfile()
  - ContextMenu()
  + CreateBuilds()
  - ContextMenu()
  + PrintBuilds()

Conexões:
  BuildDebugBootstrap,
  EquipmentDatabase,
  BuildValidationService,
  PlayerBuildService,
  EquipmentRepository,
  RuneRepository,
  RuneDatabase,
  PlayerProfileRuntime,

**## NetworkSingleton**

Variaveis:

Funções:
  + Spawned()
  + Despawned()

Conexões:

**## NetworkPlayerManager**

Variaveis:
  - spawnPointName: [SerializeField] private string;
  + playerCount: int;
  - _players: readonly Dictionary<PlayerRef, NetworkObject>;
  - cachedSpawnPoint: [SerializeField] private GameObject;
  - cachedSpawnPointSearched: [SerializeField] private bool;

Funções:
  - Header()
  - Header()
  - Header()
  - new()
  - OnEnable()
  - SearchPlayerSpawnPoint()
  + SpawnPlayer()
  + GetPlayerObject()
  + DespawnPlayer()
  + GetPlayerCount()
  + ClearSpawnPointCache()

Conexões:

**## Gatherable**

Variaveis:
  - data: [SerializeField] private GatherableData;
  - interactionConfig: [SerializeField] private InteractionConfig;
  - visual: [SerializeField] private GatherableVisual;
  + collectedBy: NetworkArray<PlayerRef>;
  - gatherProgress: Dictionary<PlayerRef, float>;

Funções:
  + GetInteractionType()
  + GetTransform()
  + GetProgress()
  + CanInteract()
  - Header()
  - Capacity()
  - new()
  - Awake()
  + Init()
  + Render()
  + InteractStart()
  + InteractTick()
  + InteractStop()
  + OnFocusEnter()
  + OnFocusExit()
  - CompleteGather()
  - GiveItem()
  - HasPlayerCollected()
  - IsDepleted()

Conexões:
  GatherableData,
  GatherableVisual,
  InteractionConfig,
  GatherUIController,

**## GatherableAreaSpawner**

Variaveis:
  - database: [SerializeField] private GatherableDatabase;
  - allowedTypes: [SerializeField] private GatherableType[];
  - amountToSpawn: [SerializeField] private int;
  - radius: [SerializeField] private float;

Funções:
  + Spawned()
  - SpawnAll()
  - SpawnOne()
  - GetRandomPointInArea()
  - OnDrawGizmos()

Conexões:
  Gatherable,
  GatherableDatabase,

**## GatherableData**

Variaveis:
  + Type: GatherableType;
  + GatherType: GatherType;
  + Prefab: GameObject;

Funções:

Conexões:

**## GatherableVisual**

Variaveis:
  - rend: [SerializeField] private Renderer;
  - highlightColor: [SerializeField] private Color;
  - originalColor: [SerializeField] private Color;

Funções:
  - Awake()
  + SetHighlight()
  + SetVisible()

Conexões:

**## TimeScheduler**

Variaveis:
  - _cancellationTokenSource: readonly CancellationTokenSource;
  - _callback: Action;
  - _processTask: Task;

Funções:
  + TimeScheduler()
  - RunAsync()
  + Cancel()
  + Dispose()

Conexões:

**## IInteractable**

Variaveis:

Funções:
  - GetInteractionType()
  - GetTransform()
  - InteractStart()
  - InteractTick()
  - InteractStop()
  - OnFocusEnter()
  - OnFocusExit()
  - CanInteract()

Conexões:

**## InteractionConfig**

Variaveis:
  + settings: List<InteractionSettings>;

Funções:
  + GetRange()
  + GetHoldTime()
  + GetOffset()

Conexões:
  InteractionSettings,

**## InteractionSettings**

Variaveis:
  + type: InteractionType;
  + range: float;
  + holdTime: float;
  + offSet: float;

Funções:

Conexões:

**## IProgressInteractable**

Variaveis:

Funções:
  - GetProgress()

Conexões:

**## LifeFountain**

Variaveis:
  - interactionConfig: [SerializeField] private InteractionConfig;
  - maxCharges: [SerializeField] private int;
  - healPercent: [SerializeField] private float;
  - fountainVisuals: [SerializeField] private GameObject[];
  - progressPerPlayer: Dictionary<PlayerRef, float>;

Funções:
  + GetInteractionType()
  + GetTransform()
  + GetProgress()
  - Header()
  - Header()
  - new()
  + Spawned()
  + Render()
  + InteractStart()
  + InteractTick()
  + InteractStop()
  + OnFocusEnter()
  + OnFocusExit()
  + CanInteract()
  - CanPlayerBeHealed()
  - Consume()
  - HealPlayer()

Conexões:
  InteractionConfig,
  PlayerHealth,
  GatherUIController,

**## RewardEntry**

Variaveis:
  + ItemId: string;
  + Amount: int;

Funções:
  + RewardEntry()
  + IsValid()

Conexões:

**## RewardResult**

Variaveis:
  - _rewards: readonly List<RewardEntry>;
  + Rewards: IReadOnlyList<RewardEntry>;

Funções:
  - new()
  + Add()
  + Add()
  + IsEmpty()
  + Clear()

Conexões:
  RewardEntry,

**## RewardService**

Variaveis:
  - _inventoryService: readonly InventoryService;
  - _itemDatabase: readonly IItemRepository;

Funções:
  + RewardService()
  + Apply()
  + Apply()

Conexões:
  RewardEntry,
  RewardResult,
  IItemRepository,
  InventoryService,

**## SceneSwitcherOverlay**

Variaveis:

Funções:
  + SceneSwitcherOverlay()

Conexões:
  SceneDropdown,

**## SceneDropdown**

Variaveis:
  + ID: const string;

Funções:
  + SceneDropdown()
  - ShowSceneMenu()

Conexões:

**## ScreenEntry**

Variaveis:
  + Type: ScreenType;
  + Document: UIDocument;

Funções:

Conexões:

**## UIManager**

Variaveis:
  - _ActiveScreen: [SerializeField] private ScreenType;
  + OnScreenOpen: static Action<ScreenType>;
  - screens: List<ScreenEntry>;
  - _screenMap: readonly Dictionary<ScreenType, UIDocument>;
  - _isMenuOpen: [SerializeField] bool;

Funções:
  - new()
  - new()
  - Header()
  - Awake()
  - OnDestroy()
  - ConfigureScreens()
  - OpenScreen()
  - LateUpdate()
  - ToggleMenu()
  - LockPlayerBehaviours()
  - CloseScreen()

Conexões:
  ScreenEntry,
  OrbitCamera,
  main,
  MainMenuScreen,

**## DropEntryDefinition**

Variaveis:
  - itemId: [SerializeField] private string;
  - requiredPart: [SerializeField] private BehemothPartType;
  - dropChance: [SerializeField] private float;
  - minAmount: [SerializeField] private int;
  - maxAmount: [SerializeField] private int;
  + ItemId: string;
  + RequiredPart: BehemothPartType;
  + DropChance: float;
  + MinAmount: int;
  + MaxAmount: int;

Funções:
  - Header()
  - Header()
  - Header()
  - Range()
  - Header()
  + IsValid()

Conexões:

**## DropTableDatabase**

Variaveis:
  - tables: List<DropTableDefinition>;
  - _lookup: Dictionary<string, DropTableDefinition>;

Funções:
  - new()
  - OnEnable()
  - BuildLookup()
  + TryGet()
  + GetById()

Conexões:
  DropTableDefinition,

**## DropTableDefinition**

Variaveis:
  - id: [SerializeField] private string;
  + Id: string;
  - entries: [SerializeField] private List<DropEntryDefinition>;
  + Entries: IReadOnlyList<DropEntryDefinition>;

Funções:
  - Header()
  - Header()
  - new()

Conexões:
  DropEntryDefinition,

**## ArmorDefinition**

Variaveis:

Funções:

Conexões:

**## EquipmentCraftCostData**

Variaveis:
  + ItemId: string;
  + Amount: int;

Funções:

Conexões:

**## EquipmentDatabase**

Variaveis:
  + Equipments: List<EquipmentDefinition>;

Funções:
  + new()

Conexões:
  EquipmentDefinition,

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
  - Header()
  - Header()
  - Header()
  - Header()
  + new()
  - Header()
  + new()
  - Header()
  - Header()
  - Header()
  + new()
  - Header()
  + new()

Conexões:
  EquipmentCraftCostData,
  EquipmentUpgradeData,
  WeaponData,
  PerkDefinition,

**## EquipmentProgressionDatabase**

Variaveis:
  + Levels: List<EquipmentProgressionLevelData>;

Funções:
  + new()
  + GetLevel()

Conexões:
  EquipmentProgressionLevelData,

**## EquipmentProgressionLevelData**

Variaveis:
  + Level: int;
  + EquipAttack: int;
  + EquipDefense: int;
  + IntrinsicPerkLevel: int;

Funções:

Conexões:

**## EquipmentUpgradeCostData**

Variaveis:
  + ItemId: string;
  + Amount: int;

Funções:

Conexões:

**## EquipmentUpgradeData**

Variaveis:
  + TargetLevel: int;
  + Costs: List<EquipmentUpgradeCostData>;

Funções:
  + new()

Conexões:
  EquipmentUpgradeCostData,

**## IntrinsicPerkData**

Variaveis:
  + Perk: PerkDefinition;
  + Level: int;

Funções:
  - Range()

Conexões:
  PerkDefinition,

**## DamageEntry**

Variaveis:
  + damageType: DamageType;
  + multiplier: float;

Funções:
  - Header()

Conexões:

**## AttackData**

Variaveis:
  + damages: List<DamageEntry>;
  + cooldown: float;
  + hitDelay: float;
  + recoveryDuration: float;
  + radius: float;
  + forwardOffset: float;
  + upwardOffset: float;
  + drawDebug: bool;

Funções:
  - Header()
  + new()
  - Header()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Header()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Header()

Conexões:
  DamageEntry,

**## WeaponData**

Variaveis:
  + weaponType: WeaponType;
  + lightAttack: AttackData;
  + heavyAttack: AttackData;

Funções:
  - Header()
  - Header()
  + GetAttackData()

Conexões:
  AttackData,

**## WeaponDefinition**

Variaveis:
  + WeaponType: WeaponType;

Funções:
  - Header()

Conexões:

**## GatherableDatabase**

Variaveis:
  + Gatherables: List<GatherableData>;
  - _lookup: Dictionary<GatherableType, GatherableData>;

Funções:
  + Init()
  + Get()

Conexões:
  GatherableData,

**## ItemDatabase**

Variaveis:
  - items: [SerializeField] private List<ItemDefinition>;
  - _itemsById: Dictionary<string, ItemDefinition>;

Funções:
  - new()
  - OnEnable()
  - BuildLookup()
  + GetById()
  + TryGet()
  + Contains()
  + GetAll()

Conexões:
  ItemDefinition,

**## ItemDefinition**

Variaveis:
  + Id: string;
  + DisplayName: string;
  - Description: [TextArea] public string;
  + Icon: Sprite;
  + Type: ItemType;
  + Rarity: ItemRarity;
  + MaxStack: int;

Funções:
  - Header()
  - Header()
  - Header()
  - Header()

Conexões:

**## BehemothRepository**

Variaveis:
  - _database: readonly BehemothDatabase;

Funções:
  + BehemothRepository()
  + GetById()
  + TryGet()
  + Contains()
  + GetAll()

Conexões:
  BehemothDatabase,
  BehemothDefinition,

**## IBehemothRepository**

Variaveis:

Funções:
  - GetById()
  - TryGet()
  - Contains()
  - GetAll()

Conexões:
  BehemothDefinition,

**## BuildCalculationService**

Variaveis:

Funções:
  + Recalculate()
  - CalculateBaseStats()
  - CalculateEquipment()
  - CalculateRunes()
  - CalculateConsumables()

Conexões:
  EquipmentService,
  GameServices,
  PerkService,
  RuneService,
  PlayerProfileRuntime,
  PlayerBaseStats,
  BuildStatContext,
  ConsumableService,
  ConsumableDefinition,
  BuildPerkContext,
  BuildConsumableContext,
  PlayerBuildData,
  PlayerBuildStats,
  OwnedConsumableData,
  PlayerConsumableData,
  PlayerProfileData,
  ConsumableSlotData,
  EquipmentSlotData,
  RuneSlotData,

**## BuildValidationService**

Variaveis:
  - _builds: readonly PlayerBuildCollectionData;
  - _equipments: readonly PlayerEquipmentData;
  - _runes: readonly PlayerRuneData;
  - _equipmentRepository: readonly IEquipmentRepository;
  - _runeRepository: readonly IRuneRepository;

Funções:
  + BuildValidationService()
  + CanEquipItemButton()
  + CanEquipRune()
  + IsRuneEquipped()
  + FindRuneUsage()
  + FindBuildUsingRune()

Conexões:
  IEquipmentRepository,
  IRuneRepository,
  PlayerProfileRuntime,
  PlayerBuildCollectionData,
  PlayerBuildData,
  PlayerEquipmentData,
  PlayerRuneData,
  RuneSlotData,

**## PlayerBuildService**

Variaveis:
  - _builds: readonly PlayerBuildCollectionData;
  - _validationService: readonly BuildValidationService;

Funções:
  + PlayerBuildService()
  + CreateBuild()
  + DeleteBuild()
  + RenameBuild()
  + SetActiveBuild()
  + GetBuild()
  + GetActiveBuild()
  + EquipAnEquipment()
  + UnequipAnEquipment()
  + EquipRune()
  - RemoveRuneFromPreviousSlot()
  + UnequipRune()

Conexões:
  BuildValidationService,
  PlayerProfileRuntime,
  PlayerBuildCollectionData,
  PlayerBuildData,
  EquipmentSlotData,
  RuneSlotData,

**## DropService**

Variaveis:
  - _itemRepository: readonly IItemRepository;

Funções:
  + DropService()
  + Roll()

Conexões:
  RewardResult,
  DropEntryDefinition,
  DropTableDefinition,
  IItemRepository,

**## DropTableRepository**

Variaveis:
  - _database: readonly DropTableDatabase;

Funções:
  + DropTableRepository()
  + GetById()
  + TryGet()

Conexões:
  DropTableDatabase,
  DropTableDefinition,

**## IDropTableRepository**

Variaveis:

Funções:
  - GetById()
  - TryGet()

Conexões:
  DropTableDefinition,

**## EquipmentRepository**

Variaveis:
  - _database: readonly EquipmentDatabase;

Funções:
  + EquipmentRepository()
  + GetById()
  + GetAll()

Conexões:
  EquipmentDatabase,
  EquipmentDefinition,

**## EquipmentService**

Variaveis:
  - _equipmentData: readonly PlayerEquipmentData;
  - _database: readonly IEquipmentRepository;
  - _progression: readonly EquipmentProgressionDatabase;

Funções:
  + EquipmentService()
  + HasEquipment()
  + UnlockEquipment()
  + TryGetEquipment()
  + GetEquipmentLevel()
  + GetById()
  + CanUpgrade()
  + UpgradeEquipment()
  + GetProgression()
  + GetEquipAttackByLevel()
  + GetEquipDeffenseByLevel()
  + GetEquipamentsByType()
  + GetEquipmentData()
  + ApplyStats()

Conexões:
  EquipmentDefinition,
  EquipmentProgressionDatabase,
  EquipmentProgressionLevelData,
  WeaponData,
  IEquipmentRepository,
  PlayerProfileRuntime,
  BuildStatContext,
  OwnedEquipmentData,
  PlayerEquipmentData,
  EquipmentSlotData,

**## IEquipmentRepository**

Variaveis:

Funções:
  - GetById()
  - GetAll()

Conexões:
  EquipmentDefinition,

**## GameServices**

Variaveis:

Funções:
  - Awake()
  - InitializeRepositorys()
  - InitializeSettingsServices()

Conexões:
  EquipmentDatabase,
  EquipmentProgressionDatabase,
  ItemDatabase,
  BehemothRepository,
  BuildCalculationService,
  BuildValidationService,
  PlayerBuildService,
  DropService,
  EquipmentRepository,
  EquipmentService,
  IEquipmentRepository,
  DatabasePaths,
  ItemRepository,
  PerkService,
  IRuneRepository,
  RuneRepository,
  RuneService,
  DisplaySettingsService,
  BehemothDatabase,
  RuneDatabase,
  CombatDamageService,
  ConsumableRepository,
  ConsumableService,
  IConsumableRepository,
  ConsumableDatabase,

**## DatabasePaths**

Variaveis:
  - database: const string;
  + Item: const string;
  + Equipment: const string;
  + EquipmentProgression: const string;
  + Rune: const string;
  + Consumable: const string;
  + Behemoth: const string;
  + DropTable: const string;

Funções:

Conexões:

**## IItemRepository**

Variaveis:

Funções:
  - GetById()
  - TryGet()
  - Contains()
  - GetAll()

Conexões:
  ItemDefinition,

**## ItemRepository**

Variaveis:
  - _database: readonly ItemDatabase;

Funções:
  + ItemRepository()
  + GetById()
  + TryGet()
  + Contains()
  + GetAll()

Conexões:
  ItemDatabase,
  ItemDefinition,

**## PerkService**

Variaveis:

Funções:
  + ApplyIntrinsicPerks()
  - ApplyPerkStat()
  - ApplyEffectStat()

Conexões:
  EquipmentDefinition,
  EquipmentProgressionLevelData,
  EquipmentService,
  GameServices,
  PerkDefinition,
  BuildStatContext,
  ConditionData,
  EffectData,
  EffectDefinition,
  BuildPerkContext,

**## IRuneRepository**

Variaveis:

Funções:
  - GetById()
  - GetAll()

Conexões:
  RuneDefinition,

**## RuneRepository**

Variaveis:
  - _database: readonly RuneDatabase;

Funções:
  + RuneRepository()
  + GetById()
  + GetAll()

Conexões:
  RuneDatabase,
  RuneDefinition,

**## RuneService**

Variaveis:
  - _runeDatabase: readonly IRuneRepository;

Funções:
  + RuneService()
  + GetRune()
  + ApplyRune()

Conexões:
  IRuneRepository,
  PerkDefinition,
  RuneDefinition,
  PlayerProfileRuntime,
  BuildStatContext,
  BuildPerkContext,
  OwnedRuneData,

**## DisplaySettingsService**

Variaveis:
  - ResolutionIndexKey: const string;
  + SupportedResolutions: IReadOnlyList<ResolutionData>;

Funções:
  + Load()
  + Apply()
  + GetCurrentIndex()

Conexões:
  ResolutionData,

**## ResolutionData**

Variaveis:
  + Width: readonly int;
  + Height: readonly int;
  + Label: readonly string;

Funções:
  + ResolutionData()
  + ToString()

Conexões:

**## ConnectionHandler**

Variaveis:
  - runnerPrefab: [SerializeField, ReadOnly] private NetworkRunner;
  - runner: [SerializeField, ReadOnly] private NetworkRunner;
  - localPlayerInput: [SerializeField, ReadOnly] private PlayerInputHandler;
  - networkEvents: [SerializeField, ReadOnly] private NetworkEvents;
  - cachedInputData: [SerializeField, ReadOnly] private NetworkInputData;

Funções:
  + LoadScene()
  - Awake()
  + StartConnectionAsync()
  - OnShutdownEventListener()
  + DisconnectAsync()
  + SetLocalPlayerInput()
  + OnPlayerJoined()
  + OnPlayerLeft()
  + OnInput()
  + OnInputMissing()
  + OnShutdown()
  + OnConnectFailed()
  + OnReliableDataReceived()
  + OnReliableDataProgress()
  + OnConnectedToServer()
  + OnDisconnectedFromServer()
  + OnConnectRequest()
  + OnUserSimulationMessage()
  + OnSessionListUpdated()
  + OnCustomAuthenticationResponse()
  + OnHostMigration()
  + OnReliableDataReceived()
  + OnSceneLoadDone()
  + OnSceneLoadStart()
  + OnObjectExitAOI()
  + OnObjectEnterAOI()
  + OnReliableDataProgress()

Conexões:
  NetworkPlayerManager,
  PlayerInputHandler,
  PlayerInputHandler,
  NetworkInputData,

**## InitializationHandler**

Variaveis:
  - _defaultLobbyName: [SerializeField] private string;
  - _lobbyMaxPlayers: [SerializeField] private int;
  - _initializeAsServer: [SerializeField] private bool;

Funções:
  - Header()
  - Header()
  - Start()
  + CheckAndStartConnection()
  - CreateStartGameArgs()
  - DetermineGameMode()

Conexões:
  ConnectionHandler,

**## LobbyInputController**

Variaveis:
  - _matchmakingHandler: [SerializeField] private MatchmakingHandler;
  + targetIsland: IslandType;
  + targetMode: GameModeType;
  + isPublic: bool;
  + started: bool;

Funções:
  - Header()
  - Awake()

Conexões:
  MatchmakingHandler,

**## MatchmakingHandler**

Variaveis:
  + OnHuntRequest: static Action<bool, IslandType, GameModeType>;
  - _connectionHandler: [SerializeField] private ConnectionHandler;
  - _matchmakingService: [SerializeField] private MatchmakingService;
  - _huntMaxPlayers: [SerializeField] private int;

Funções:
  - Header()
  - Header()
  - Awake()
  - OnDestroy()
  + Spawned()
  + RequestHunt()

Conexões:
  ConnectionHandler,
  MatchmakingService,

**## MatchmakingService**

Variaveis:

Funções:
  + CreateHuntSessionArgs()
  - GetSceneIndex()

Conexões:

**## BehemothController**

Variaveis:
  - _definition: [SerializeField] private BehemothDefinition;
  + Definition: BehemothDefinition;
  - _parts: readonly List<BehemothPart>;
  - _state: BehemothState;
  - _spawnCenter: Vector3;
  - _leashRadius: float;
  - returnSpeed: [SerializeField] private float;
  - resetDistance: [SerializeField] private float;
  - _target: [SerializeField] private Transform;
  - detectionRange: [SerializeField] private float;
  - moveSpeed: [SerializeField] private float;
  - stopDistance: [SerializeField] private float;
  - enableIA: [SerializeField] private bool;
  - hitboxes: [SerializeField] private BehemothHitbox[];

Funções:
  - Header()
  - Header()
  - new()
  - Header()
  - Header()
  - Header()
  + Spawned()
  + Init()
  + FixedUpdateNetwork()
  + StartAttack()
  + EndAttack()
  - MoveToTarget()
  - LookToDirection()
  - CheckLeash()
  - EnterReturnState()
  - HandleReturn()
  - ResetBehemoth()
  - UpdateTarget()
  + RegisterPart()
  + ApplyHitToPart()
  - ApplyStunDamage()
  + GetDamageType()
  - TriggerStun()
  - TakeDamage()
  - Die()
  - GenerateDeathRewards()

Conexões:
  RewardResult,
  RewardService,
  DropService,
  DropTableRepository,
  BehemothDefinition,
  BehemothHitbox,
  BehemothPart,
  HuntArea,
  HuntManager,

**## BehemothDatabase**

Variaveis:
  - behemoths: List<BehemothDefinition>;
  - _behemothsById: Dictionary<string, BehemothDefinition>;

Funções:
  - new()
  - OnEnable()
  - BuildLookup()
  + GetById()
  + TryGet()
  + Contains()
  + GetAll()

Conexões:
  BehemothDefinition,

**## BehemothDefinition**

Variaveis:
  - id: [SerializeField] private string;
  - prefab: [SerializeField] private NetworkObject;
  + Prefab: NetworkObject;
  - displayName: [SerializeField] private string;
  - maxHealth: [SerializeField] private int;
  - damage: [SerializeField] private float;
  - speed: [SerializeField] private float;
  - darkness: [SerializeField] private float;
  - stunHealth: [SerializeField] private float;
  - element: [SerializeField] private ElementType;
  - furyThreshold: [SerializeField] private float;
  - furySpeedGain: [SerializeField] private float;
  - dropTableId: [SerializeField] private string;
  + Id: string;
  + DisplayName: string;
  + MaxHealth: int;
  + Damage: float;
  + Speed: float;
  + Darkness: float;
  + StunHealth: float;
  + Element: ElementType;
  + FuryThreshold: float;
  + FurySpeedGain: float;
  + DropTableId: string;

Funções:
  - Header()
  - Header()
  - Header()
  - Header()
  - Header()
  - Header()
  - Range()
  - Header()

Conexões:

**## BehemothHealthDisplay**

Variaveis:
  - behemothController: BehemothController;
  - previousHealth: int;

Funções:
  + Spawned()
  + FixedUpdateNetwork()
  - OnHealthChanged()

Conexões:
  UIManager,
  BehemothController,

**## BehemothHitbox**

Variaveis:
  - damage: [SerializeField] private int;
  - hitCooldown: [SerializeField] private float;
  - lastHitTime: Dictionary<PlayerRef, float>;
  + IsActive: bool;

Funções:
  - new()
  + ActivateHitbox()
  + DeactivateHitbox()
  - OnTriggerStay()

Conexões:
  PlayerHealth,

**## BehemothPart**

Variaveis:
  - _partType: [SerializeField] private BehemothPartType;
  - _healthPercentageOfTotal: [SerializeField] private float;
  - _behemothController: [SerializeField] private BehemothController;
  + PartType: BehemothPartType;
  + HealthPercentageOfTotal: float;

Funções:
  - Header()
  - Header()
  - OnChangedRender()
  - OnChangedRender()
  + Spawned()
  + InitializePartHealth()
  + ResetPartState()
  + ProcessDamage()
  - ProcessBreakDamage()
  - GenerateBreakRewards()
  - ProcessWoundDamage()
  - OnBreakStateChanged()
  - OnWoundStateChanged()

Conexões:
  RewardResult,
  RewardService,
  DropService,
  DropTableRepository,
  BehemothController,
  HuntManager,

**## BehemothPartConfig**

Variaveis:
  + PartDamageMultipliers: List<DamageMultiplierEntry>;

Funções:
  + GetDamageMultiplier()

Conexões:
  DamageMultiplierEntry,
  DamageTypeMultiplier,

**## DamageMultiplierEntry**

Variaveis:
  + PartType: BehemothPartType;
  + DamageTypeMultipliers: List<DamageTypeMultiplier>;

Funções:

Conexões:
  DamageTypeMultiplier,

**## DamageTypeMultiplier**

Variaveis:
  + Type: DamageType;
  + Multiplier: float;

Funções:

Conexões:

**## CameraShake**

Variaveis:
  - originalLocalRotation: [SerializeField] private Quaternion;
  - shakeRoutine: Coroutine;
  - duration: [SerializeField] private float;
  - auxDuration: [SerializeField] private float;
  - magnitude: [SerializeField] private float;

Funções:
  - Awake()
  + Shake()
  - ShakeRoutine()

Conexões:

**## OrbitCamera**

Variaveis:
  + target: Transform;
  + targetOffset: Vector3;
  + distance: float;
  + minDistance: float;
  + maxDistance: float;
  + mouseSensitivity: float;
  + smoothTime: float;
  + minVerticalAngle: float;
  + maxVerticalAngle: float;
  - _rotationX: float;
  - _rotationY: float;
  - _currentRotation: Vector3;
  - _rotationVelocity: Vector3;

Funções:
  - Header()
  + Vector3()
  - Header()
  - Header()
  - Header()
  - LateUpdate()
  - HandleInput()
  - CalculatePosition()
  + SetTarget()

Conexões:
  PlayerMovement,

**## PerkData**

Variaveis:
  + InitialValue: int;
  + ValueAP: int;
  + ValueType: ValueType;

Funções:
  - Header()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  + GetValueByLevel()

Conexões:

**## PerkDefinition**

Variaveis:
  + Id: string;
  + DisplayName: string;
  + Description: string;
  + Icon: Sprite;
  - Max_Level: [SerializeField][ReadOnly] int;
  + ConditionData: ConditionData;
  + EffectDefinition: EffectDefinition;
  + EffectData: EffectData;

Funções:
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Header()
  - Header()
  - Tooltip()
  - Tooltip()

Conexões:
  ConditionData,
  EffectData,
  EffectDefinition,

**## RuneDatabase**

Variaveis:
  + Runes: List<RuneDefinition>;

Funções:
  + new()

Conexões:
  RuneDefinition,

**## RuneDefinition**

Variaveis:
  + Id: string;
  + DisplayName: string;
  + Description: string;
  + Icon: Sprite;
  + SlotType: RuneSlotType;
  + Perk: PerkDefinition;

Funções:
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Tooltip()

Conexões:
  PerkDefinition,

**## HuntConfig**

Variaveis:
  + BehemothDatabase: BehemothDatabase;
  + DropTableDatabase: DropTableDatabase;
  + ItemDatabase: ItemDatabase;
  + BehemothIds: string[];
  + RespawnDelay: float;

Funções:
  - Header()
  - Header()
  - Header()

Conexões:
  DropTableDatabase,
  ItemDatabase,
  BehemothDatabase,

**## HuntArea**

Variaveis:
  - lifeFountainPrefab: [SerializeField] private NetworkPrefabRef;
  - spawnedFountains: List<NetworkObject>;
  + HuntAreaRadius: float;
  - respawnTimer: float;
  - manager: HuntManager;

Funções:
  - new()
  + Init()
  + Tick()
  + OnBehemothDied()
  + TrySpawn()
  - SetState()
  - OnDrawGizmos()
  - SpawnFountains()
  - DespawnFountains()

Conexões:
  BehemothController,
  HuntManager,

**## Cachorro**

Variaveis:
  - nome: string;

Funções:
  + Cachorro()
  + Cachorro()
  + SetNome()
  + GetNome()

Conexões:

**## main**

Variaveis:
  - meuCahorro: Cachorro;

Funções:
  + Main()

Conexões:
  Cachorro,

**## HuntManager**

Variaveis:
  - config: [SerializeField] private HuntConfig;
  + Config: HuntConfig;
  - areas: [SerializeField] private List<HuntArea>;
  - aliveBehemoths: [SerializeField] private HashSet<string>;
  + AliveBehemoths: HashSet<string>;
  - _dropTableRepository: IDropTableRepository;
  - _dropService: DropService;
  - _itemRepository: IItemRepository;
  + DropTableRepository: IDropTableRepository;
  + DropService: DropService;

Funções:
  + Spawned()
  - Initialize()
  + FixedUpdateNetwork()
  + GetAvailableBehemoth()
  + SpawnBehemoth()
  + OnBehemothDied()
  - GetRandomPoint()
  - ContextMenu()
  - PrintInventory()

Conexões:
  RewardService,
  DropTableDatabase,
  ItemDatabase,
  DropService,
  DropTableRepository,
  IDropTableRepository,
  IItemRepository,
  ItemRepository,
  BehemothController,
  BehemothDatabase,
  HuntConfig,
  HuntArea,
  InventoryService,

**## AttackDamageModifier**

Variaveis:

Funções:
  + Calculate()
  + ResolvePerks()

Conexões:
  CombatPerkInstance,
  PlayerCombatStats,
  PlayerCombatStats,
  ICondition,
  EffectDefinition,

**## CriticalChanceModifier**

Variaveis:

Funções:
  + Calculate()

Conexões:
  CombatPerkInstance,
  CombatPerkRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  EffectData,
  EffectDefinition,

**## CriticalDamageModifier**

Variaveis:

Funções:
  + Calculate()

Conexões:
  CombatPerkInstance,
  CombatPerkRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  EffectData,
  EffectDefinition,

**## DamageDealtModifier**

Variaveis:

Funções:
  + Calculate()

Conexões:
  CombatPerkInstance,
  CombatPerkRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  EffectData,
  EffectDefinition,

**## CombatPerkInstance**

Variaveis:

Funções:
  + CombatPerkInstance()

Conexões:
  ICondition,
  EffectDefinition,

**## CombatPerkRuntime**

Variaveis:

Funções:

Conexões:
  CombatEvent,
  CombatPerkInstance,
  PlayerCombatStats,
  PlayerCombatStats,
  ConditionData,
  EffectData,
  BuildPerkSummary,
  PlayerBuildStats,

**## CombatDamageService**

Variaveis:
  - _attackDamageModifier: readonly AttackDamageModifier;
  - _criticalChanceModifier: readonly CriticalChanceModifier;
  - _criticalDamageModifier: readonly CriticalDamageModifier;
  - _damageDealtModifier: readonly DamageDealtModifier;

Funções:
  + CombatDamageService()
  + CalculateDamage()
  - RollCritical()
  - GetCriticalMultiplier()

Conexões:
  DamageEntry,
  AttackDamageModifier,
  CriticalChanceModifier,
  CriticalDamageModifier,
  DamageDealtModifier,
  DamageResult,
  PlayerCombatStats,
  PlayerCombatStats,

**## DamageResult**

Variaveis:

Funções:
  + DamageResult()

Conexões:

**## InventoryService**

Variaveis:
  - _inventoryData: readonly PlayerInventoryData;
  - _itemDatabase: readonly IItemRepository;

Funções:
  + InventoryService()
  + AddItem()
  + RemoveItem()
  + HasItem()
  + HasItem()
  + GetAmount()
  + GetInventoryData()

Conexões:
  ItemDefinition,
  IItemRepository,
  ItemStack,
  PlayerProfileRuntime,
  PlayerInventoryData,

**## ItemStack**

Variaveis:
  + ItemId: string;
  + Amount: int;

Funções:
  + ItemStack()
  + IsValid()

Conexões:

**## PlayerRoot**

Variaveis:

Funções:
  + Spawned()
  - InitializeLocalPlayer()
  + UpdateCombatStats()

Conexões:
  PlayerNetworkState,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  PlayerConsumables,
  PlayerHealth,

**## PlayerInputHandler**

Variaveis:

Funções:

Conexões:
  ConnectionHandler,
  OrbitCamera,
  main,
  NetworkInputData,

**## PlayerInputHandler**

Variaveis:
  - jumpKey: [SerializeField] public KeyCode;
  - lightAttackKey: [SerializeField] private KeyCode;
  - heavyAttackKey: [SerializeField] private KeyCode;
  - interactKey: [SerializeField] private KeyCode;
  - slot1Key: [SerializeField] private KeyCode;
  - slot2Key: [SerializeField] private KeyCode;
  - slot3Key: [SerializeField] private KeyCode;
  - slot4Key: [SerializeField] private KeyCode;
  - inputDeadzone: [SerializeField] private float;
  - mainCamera: Camera;
  - cachedInputDirection: Vector3;
  - cachedCameraForward: Vector3;
  - cachedCameraRight: Vector3;
  - cachedHorizontal: float;
  - cachedVertical: float;
  - cachedInputMagnitude: float;
  - MAX_INPUT_MAGNITUDE: const float;
  - MIN_DEADZONE: const float;
  - MAX_DEADZONE: const float;

Funções:
  - Header()
  + Spawned()
  - ValidateSettings()
  - RegisterLocalInput()
  - SetupLocalCamera()
  + GetLocalInput()
  - CalculateCameraRelativeDirection()
  - ValidateMoveDirection()
  + GetMainCamera()

Conexões:
  ConnectionHandler,
  OrbitCamera,
  main,
  NetworkInputData,

**## NetworkInputData**

Variaveis:
  + MoveDirection: Vector3;
  + InputTimestamp: float;
  + Moving: bool;
  + Buttons: NetworkButtons;
  + ATTACK_LIGHT: const byte;
  + ATTACK_HEAVY: const byte;
  + ATTACK_SPECIAL: const byte;
  + INTERACT: const byte;
  + JUMP: const byte;
  + INTERACT_HOLD: const byte;
  + USE_SLOT_1: const byte;
  + USE_SLOT_2: const byte;
  + USE_SLOT_3: const byte;
  + USE_SLOT_4: const byte;
  + IsLightAttackPressed: bool;
  + IsHeavyAttackPressed: bool;
  + IsJumpPressed: bool;
  + IsInteractPressed: bool;
  + IsInteractHeld: bool;
  + IsUseSlot1Pressed: bool;
  + IsUseSlot2Pressed: bool;
  + IsUseSlot3Pressed: bool;
  + IsUseSlot4Pressed: bool;

Funções:
  + IsSet()
  + IsSet()
  + IsSet()
  + IsSet()
  + IsSet()
  + IsSet()
  + IsSet()
  + IsSet()
  + IsSet()

Conexões:

**## PlayerNetworkState**

Variaveis:

Funções:
  - Header()
  - Header()
  - Header()
  + Spawned()
  + SetDowned()
  + SetUsingConsumable()
  + SetGathering()

Conexões:

**## LocalPlayerRuntime**

Variaveis:

Funções:

Conexões:
  PlayerNetworkState,
  PlayerCombatStats,
  PlayerCombatStats,
  PlayerConsumables,
  PlayerHealth,

**## LocalPlayerRuntime**

Variaveis:
  - _instance: static readonly LocalPlayerRuntime;
  + Instance: static LocalPlayerRuntime;

Funções:
  - new()
  - LocalPlayerRuntime()
  + Initialize()
  + SetPlayerCombatStats()

Conexões:
  PlayerRoot,
  PlayerCombatStats,
  PlayerCombatStats,

**## PlayerProfileRuntime**

Variaveis:
  + OnBuildStatsChanged: event Action;
  - _debugBootstrap: BuildDebugBootstrap;
  - _useDebugBootstrap: bool;

Funções:
  - Awake()
  + RaiseBuildStatsChanged()
  - LoadDebugData()

Conexões:
  BuildDebugBootstrap,
  PlayerCombatSynchronizer,
  PlayerBuildData,
  PlayerBuildStats,
  PlayerProfileData,

**## PlayerAttack**

Variaveis:
  - _WeaponData: [SerializeField, ReadOnly] private WeaponData;
  - attackOrigin: [SerializeField] private Transform;
  - hitMask: [SerializeField] private LayerMask;
  - debugLogs: [SerializeField] private bool;
  - showLocalAttackSphere: [SerializeField] private bool;
  - localAttackSphereDuration: [SerializeField] private float;
  - localAttackSphereMaterial: [SerializeField] private Material;
  - _lagHits: readonly List<LagCompensatedHit>;
  + IsAttacking: bool;

Funções:
  - Header()
  - Header()
  - Header()
  - Header()
  - Header()
  - new()
  + Spawned()
  + SubscribeGetWeaponData()
  + Despawned()
  + FixedUpdateNetwork()
  - ProcessAttackInput()
  - CanStartAttack()
  - StartAttack()
  - ProcessAttackTimers()
  - ExecuteLagCompensatedHit()
  - ResolveBehemothPart()
  - GetAttackDirection()
  - GetAttackCenter()
  - DrawDebugAttackSphere()
  - Rpc()
  - RPC_ShowAttackSphere()
  - Rpc()
  - RPC_ShowAttackFeedback()
  - ShowLocalAttackSphere()
  - DestroySphereRoutine()
  - CreateRuntimeDebugSphereMaterial()
  - GetWeaponData()

Conexões:
  CombatEvent,
  CombatEventDispatcher,
  DamageEntry,
  AttackData,
  WeaponData,
  GameServices,
  BehemothController,
  BehemothPart,
  CameraShake,
  main,
  DamageResult,
  PlayerRoot,
  NetworkInputData,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerProfileRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  DamageAnimator,

**## PlayerBaseStats**

Variaveis:

Funções:

Conexões:

**## PlayerCombatStats**

Variaveis:

Funções:

Conexões:
  CombatPerkInstance,
  CombatPerkRuntime,
  CombatConsumableInstance,
  CombatConsumableInstance,
  ConditionData,
  ICondition,
  EffectData,
  EffectDefinition,
  BuildConsumableSummary,
  BuildPerkSummary,
  PlayerBuildStats,

**## CombatConsumableInstance**

Variaveis:

Funções:

Conexões:
  ConsumableDefinition,

**## PlayerCombatStats**

Variaveis:
  - PerkSummaryList: List<BuildPerkSummary>;
  - _conditions: readonly List<ICondition>;
  - ConsumablesList: List<BuildConsumableSummary>;

Funções:
  - new()
  + ApplyBuild()
  - ResolvePerks()
  - CreateCondition()
  - CreateConditionRuntime()
  - OnConditionChanged()
  - ResolveConsumables()
  - ClearRuntimeState()
  + Despawned()

Conexões:
  CombatEventDispatcher,
  CombatPerkInstance,
  CombatConsumableInstance,
  CombatConsumableInstance,
  ConditionData,
  ConditionDefinition,
  ICondition,
  NotHitRecentlyConditionDefinition,
  NotHitRecentlyConditionRuntime,
  EffectData,
  EffectDefinition,
  BuildConsumableSummary,
  BuildPerkSummary,
  PlayerBuildStats,

**## CombatConsumableInstance**

Variaveis:

Funções:
  + CombatConsumableInstance()

Conexões:
  ConsumableDefinition,

**## PlayerCombatSynchronizer**

Variaveis:
  - _combatStats: [SerializeField, ReadOnly] private PlayerCombatStats;

Funções:
  + Spawned()
  + EventSubscribe()
  + Despawned()
  + Dispose()
  - SyncBuild()
  - IsInHunt()

Conexões:
  GameServices,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerProfileRuntime,
  PlayerAttack,
  PlayerCombatStats,
  PlayerCombatStats,
  PlayerBuildStats,

**## ConsumableUseState**

Variaveis:
  + DurationTimer: TickTimer;

Funções:

Conexões:

**## PlayerConsumables**

Variaveis:
  - usePotionTime: float;
  + DurationTimer: TickTimer;
  + OnConsumableExecuted: event Action<OwnedConsumableData>;
  - _useStates: List<TickTimer>;
  + UseStates: List<TickTimer>;
  - UseStatesString: [SerializeField, ReadOnly] private List<string>;
  - playerState: PlayerNetworkState;

Funções:
  - new()
  - new()
  + FixedUpdateNetwork()
  - Rpc()
  - RPC_UseSlot()
  - UpdateSlotTimers()
  - ExecuteConsumable()

Conexões:
  GameServices,
  ConnectionHandler,
  PlayerRoot,
  NetworkInputData,
  PlayerNetworkState,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerProfileRuntime,
  PlayerCombatStats,
  CombatConsumableInstance,
  PlayerCombatStats,
  CombatConsumableInstance,
  ConsumableUseState,
  ConsumableDefinition,
  EffectData,
  EffectDefinition,
  OwnedConsumableData,

**## PlayerHealth**

Variaveis:
  - config: [SerializeField] private InteractionConfig;
  - playerState: [SerializeField] private PlayerNetworkState;
  - reviveProgress: Dictionary<PlayerRef, float>;
  - maxHealth: [SerializeField] private int;
  + MaxHealth: int;

Funções:
  + GetTransform()
  + GetInteractionType()
  - new()
  - OnChangedRender()
  + Spawned()
  + InteractStart()
  + InteractStop()
  + InteractTick()
  + OnFocusEnter()
  + OnFocusExit()
  - OnHealthChanged()
  + CanInteract()
  + TakeDamage()
  - EnterDownedState()
  + Revive()
  + Heal()

Conexões:
  CombatEvent,
  CombatEventDispatcher,
  InteractionConfig,
  PlayerNetworkState,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  CombatStats,
  DownedPlayerUI,

**## PlayerInteractor**

Variaveis:
  - config: [SerializeField] private InteractionConfig;
  - interactableObject: [SerializeField] private GameObject;
  - lockedTarget: IInteractable;

Funções:
  - Header()
  + FixedUpdateNetwork()
  - FindInteractable()
  - Rpc()
  - RPC_InteractStart()
  - Rpc()
  - RPC_InteractTick()
  - Rpc()
  - RPC_InteractStop()

Conexões:
  IInteractable,
  InteractionConfig,
  NetworkInputData,

**## PlayerMovement**

Variaveis:
  - networkCharacterController: [SerializeField] private NetworkCharacterController;
  - playerNetworkState: [SerializeField] private PlayerNetworkState;
  - animationStateMachine: [SerializeField] private PlayerAnimationStateMachine;
  - playerAttack: [SerializeField] private PlayerAttack;
  - health: [SerializeField] private PlayerHealth;
  - moveSpeed: [SerializeField] private float;
  - sprintMultiplier: [SerializeField] private float;
  - rotationSpeed: [SerializeField] private float;
  - jumpForce: [SerializeField] private float;
  - maxAllowedInputMagnitude: [SerializeField] private float;
  - MAX_MOVE_SPEED: const float;
  - MAX_JUMP_FORCE: const float;
  - isGrounded: bool;
  - isMoving: bool;
  - isJumping: bool;

Funções:
  - Header()
  - Header()
  - Header()
  - Header()
  + Spawned()
  - CacheReferences()
  - ValidateSettings()
  + FixedUpdateNetwork()
  - StopMovementBecauseAttacking()
  - SimulateMovement()
  - ApplyLocalRotationPrediction()
  - ApplyVisualAnimation()
  - SanitizeInput()
  + IsGrounded()
  + IsJumping()
  + IsSprinting()

Conexões:
  NetworkInputData,
  PlayerNetworkState,
  PlayerAttack,
  PlayerHealth,
  PlayerAnimationStateMachine,
  PlayerAnimationStateMachine,

**## PlayerStatsTester**

Variaveis:
  + Attack: float;
  + Defense: float;
  + CriticalChance: float;

Funções:

Conexões:

**## RuneTester**

Variaveis:
  - rune: [SerializeField] private RuneDefinition;
  - stats: [SerializeField] private PlayerStatsTester;

Funções:
  - Start()

Conexões:
  RuneDefinition,
  PlayerStatsTester,

**## PlayerAnimationStateMachine**

Variaveis:

Funções:

Conexões:
  PlayerNetworkState,

**## PlayerAnimationStateMachine**

Variaveis:
  - animator: [SerializeField] private Animator;
  - playerAttack: [SerializeField] private PlayerAttack;
  - SprintHash: static readonly int;
  - JumpAllHash: static readonly int;
  - JumpWhileRunningHash: static readonly int;
  - DownedHash: static readonly int;
  - UsingConsumableHash: static readonly int;
  - GatheringHash: static readonly int;
  - AttackHash: static readonly int;
  - LightAttackHash: static readonly int;
  - HeavyAttackHash: static readonly int;
  - _lastAttackSequence: int;

Funções:
  - Header()
  - Header()
  - StringToHash()
  - StringToHash()
  - StringToHash()
  - StringToHash()
  - StringToHash()
  - StringToHash()
  - StringToHash()
  - StringToHash()
  - StringToHash()
  - Header()
  - Awake()
  - Update()
  + ApplyNetworkState()
  + ApplyAnimationState()
  - ProcessAttackAnimationEvent()
  - PlayAttackAnimation()
  - ResetAnimatorParameters()
  + GetCurrentVisualState()
  + IsJumping()
  + IsSprinting()

Conexões:
  PlayerNetworkState,
  PlayerAttack,

**## CombatStats**

Variaveis:

Funções:
  + new()
  + new()
  + new()
  + new()
  + new()

Conexões:
  Stat,

**## DefenseStats**

Variaveis:

Funções:
  + new()
  + new()
  + new()
  + new()

Conexões:
  Stat,

**## ElementalStats**

Variaveis:

Funções:
  + new()
  + new()
  + new()
  + new()
  + new()
  + new()

Conexões:
  Stat,

**## PlayerStats**

Variaveis:
  - _stats: readonly Dictionary<StatType, Stat>;

Funções:
  + new()
  + new()
  + new()
  + new()
  + PlayerStats()
  + GetStat()
  + TryGetStat()
  - CreateStatDictionary()

Conexões:
  CombatStats,
  DefenseStats,
  ElementalStats,
  Stat,
  UtilityStats,

**## StatModifier**

Variaveis:

Funções:

Conexões:

**## Stat**

Variaveis:

Funções:
  + Add()
  + Subtract()
  + Reset()

Conexões:

**## UtilityStats**

Variaveis:

Funções:
  + new()
  + new()
  + new()
  + new()

Conexões:
  Stat,

**## BuildStatContext**

Variaveis:
  - _stats: readonly Dictionary<StatType, StatCalculator>;

Funções:
  - new()
  + BuildStatContext()
  + Get()
  + SetBase()
  + AddFlat()
  + AddPercent()
  + Multiply()
  + Reset()
  + Resolve()

Conexões:
  Stat,
  StatCalculator,
  PlayerBuildStats,

**## StatCalculator**

Variaveis:

Funções:
  + AddFlat()
  + AddPercent()
  + Multiply()
  + Calculate()
  + Reset()

Conexões:

**## DamageAnimator**

Variaveis:
  + Instance: static DamageAnimator;
  - root: VisualElement;
  - damageLayer: VisualElement;
  - damageTranslateRange: [SerializeField] private float;
  - damageUpwardsTranslate: [SerializeField] private float;
  - damageDownwardsTranslate: [SerializeField] private float;
  - damageDelayTranslate: [SerializeField] private int;

Funções:
  - Awake()
  + ShowDamage()
  - AnimateAndDestroy()

Conexões:

**## MMAnimations**

Variaveis:

Funções:
  + Rotate()
  + Scale()
  + Fade()
  + AnimateStyleValues()

Conexões:

**## IScreen**

Variaveis:

Funções:
  - OnEnable()
  - OnDisable()

Conexões:

**## BuildScreen**

Variaveis:
  - _viewModel: BuildViewModel;
  - _document: UIDocument;
  - _root: VisualElement;
  - _buildName: Text;
  - _build1Button: AH_Button;
  - _build2Button: AH_Button;
  - _build3Button: AH_Button;
  - _equipmentStatusDrawer: EquipmentStatusDrawer;
  - _equipmentsContainer: VisualElement;
  - _equipments: readonly Dictionary<EquipmentType, EquipItemButton>;
  - _selectedEquipButton: EquipItemButton;
  - _perkSummaryContainer: VisualElement;
  - _perkComponent: VisualElement;
  - _equipmentSelectionPopup: EquipmentSelectionPopup;
  - clonedStatComponent: VisualElement;

Funções:
  - new()
  - OnEnable()
  - BindElements()
  - RegisterEvents()
  - HandleEquipButtonClicked()
  - RequestBuild()
  - OpenEquipmentInformationDrawer()
  - EquipEquipment()
  - UnequipAnEquipment()
  - EquipRune()
  - UnequipRune()
  - OpenRuneSelectionPopup()
  - Refresh()
  - RefreshStatsContainer()
  - RefreshEquipments()
  - RefreshRunes()
  - BuildPerkComponent()
  - PupulateEquipItemButton()

Conexões:
  EquipmentDefinition,
  BuildViewModel,
  BuildPerkSummary,
  PlayerBuildData,
  PlayerBuildStats,
  AH_Button,
  RuneSelectionContext,
  RuneSlotContext,
  EquipItemButton,
  EquipmentSelectionPopup,
  EquipmentStatusDrawer,
  RuneSelectionItem,

**## BuildViewModel**

Variaveis:
  - _buildService: PlayerBuildService;
  - _BuildCalculationService: BuildCalculationService;
  - _validation: BuildValidationService;
  - _runeService: RuneService;
  - currentActiveBuild: PlayerBuildData;
  - playerBuildData: List<PlayerBuildData>;

Funções:
  + Initialize()
  + SelectBuild()
  + GetPlayerBuildData()
  + EquipAnEquipment()
  + UnequipAnEquipment()
  + GetBuildEquipments()
  + GetPlayerEquipmentStats()
  + GetPlayerOwnedEquips()
  + GetEquipmentSelectionItemStats()
  + GetRuneSlots()
  - GetPlayerOwnedRunes()
  + GetPlayerAvailableRunes()
  + EquipRune()
  + UnequipRune()
  + CalculateBuild()

Conexões:
  EquipmentDefinition,
  BuildCalculationService,
  BuildValidationService,
  PlayerBuildService,
  EquipmentService,
  GameServices,
  RuneService,
  RuneDefinition,
  PlayerProfileRuntime,
  EquipmentSelectionItemStats,
  PlayerBuildData,
  PlayerBuildStats,
  OwnedEquipmentData,
  OwnedRuneData,
  PlayerProfileData,
  RuneSelectionContext,
  RuneSlotContext,
  RuneSlotViewData,
  EquipItemButton,
  EquipmentSlotData,
  RuneSlotData,

**## EquipmentSelectionItemStats**

Variaveis:
  + equipmentDefinition: EquipmentDefinition;
  + EquipStat: int;
  + Equiplevel: int;
  + IntrisickRuneName: string;
  + IntrisickRuneLevel: int;

Funções:

Conexões:
  EquipmentDefinition,

**## HuntMenuScreen**

Variaveis:
  - _viewModel: HuntMenuViewModel;
  - _uiDocument: [SerializeField] private UIDocument;
  - _root: VisualElement;
  - _btnIsland1: Button;
  - _btnIsland2: Button;
  - _btnPublic: Button;
  - _btnPrivate: Button;
  - _btnStartHunt: Button;
  - _selectedIsland: [SerializeField] private IslandType;
  - _isPublicMatch: [SerializeField] private bool;

Funções:
  - OnEnable()
  - BindUIElements()
  + SetMenuVisible()
  - SelectIsland()
  - SelectPrivacy()
  - OnStartHuntClicked()

Conexões:
  UIManager,
  HuntMenuViewModel,

**## HuntMenuViewModel**

Variaveis:

Funções:
  + HandleHuntRequest()

Conexões:
  UIManager,
  MatchmakingHandler,

**## InventoryScreen**

Variaveis:
  - _viewModel: InventoryViewModel;
  - root: VisualElement;
  - itemContainer: VisualElement;

Funções:
  - OnEnable()
  - Refresh()
  - OnDisable()

Conexões:
  InventoryViewModel,

**## InventoryViewModel**

Variaveis:
  + OnInventoryChanged: event Action;
  - _inventory: PlayerInventoryData;

Funções:
  + Initialize()
  - RaiseChanged()
  + GetItems()
  + Dispose()

Conexões:
  ItemStack,
  PlayerProfileRuntime,
  PlayerInventoryData,

**## MainMenuScreen**

Variaveis:
  - _uiDocument: UIDocument;
  - _root: VisualElement;
  - _huntBtn: Button;
  - _buildBtn: Button;
  - _invBtn: Button;
  - _SettingsBtn: Button;

Funções:
  - OnEnable()
  - BindUIElements()

Conexões:
  UIManager,

**## SettingsScreen**

Variaveis:
  - _viewModel: SettingsViewModel;
  - _uiDocument: UIDocument;
  - _root: VisualElement;
  - _button1: AH_Button;
  - _button2: AH_Button;
  - _button3: AH_Button;

Funções:
  - OnEnable()
  - OnFullHDClicked()
  - OnHDClicked()
  - OnSDClicked()

Conexões:
  SettingsViewModel,
  AH_Button,

**## SettingsViewModel**

Variaveis:
  - _displaySettingsService: DisplaySettingsService;

Funções:
  + Initialize()
  + ApplyFullHD()
  + ApplyHD()
  + ApplySD()

Conexões:
  GameServices,
  DisplaySettingsService,

**## DownedPlayerUI**

Variaveis:
  + Instance: static DownedPlayerUI;
  - interactionConfig: [SerializeField] private InteractionConfig;
  - mainCamera: [SerializeField] private Camera;
  - root: VisualElement;
  - damageLayer: VisualElement;
  - _tracker: WorldUITracker;
  - NearClass: const string;
  - FocusClass: const string;
  - trackedPlayers: Dictionary<PlayerHealth, PlayerDownedComponent>;
  - focusedPlayer: PlayerHealth;
  - worldPos: [SerializeField] private Vector3;
  - camScreenPos: [SerializeField] private Vector3;

Funções:
  - Header()
  - new()
  - Header()
  - Awake()
  - OnEnable()
  - LateUpdate()
  - SyncPlayers()
  - UpdatePositions()
  + SetFocusedPlayer()
  + ClearFocusedPlayer()
  - GetLocalPlayer()
  + RegisterPlayer()
  + UnregisterPlayer()

Conexões:
  InteractionConfig,
  main,
  PlayerNetworkState,
  PlayerHealth,
  PlayerDownedComponent,
  WorldUITracker,

**## GatherUIController**

Variaveis:
  - currentProgressTarget: IProgressInteractable;
  + Instance: static GatherUIController;
  - root: VisualElement;
  - gatherUI: VisualElement;
  - gatheringComponent: GatheringComponent;
  - cam: [SerializeField] private Camera;
  - target: [SerializeField] private Transform;
  - currentGather: [SerializeField] private Gatherable;
  - _tracker: WorldUITracker;
  - interactionConfig: [SerializeField] private InteractionConfig;
  - worldPos: [SerializeField] private Vector3;
  - camScreenPos: [SerializeField] private Vector3;

Funções:
  - Header()
  - Header()
  - OnEnable()
  + SetTarget()
  + SetProgress()
  + SetMode()
  - LateUpdate()

Conexões:
  Gatherable,
  InteractionConfig,
  IProgressInteractable,
  main,
  GatheringComponent,
  WorldUITracker,

**## OnHuntScreen**

Variaveis:

Funções:

Conexões:
  ConsumablesView,
  ConsumablesViewModel,
  HealthView,
  HealthViewModel,

**## ConsumableRepository**

Variaveis:
  - database: ConsumableDatabase;

Funções:
  + ConsumableRepository()
  + GetById()
  + GetAll()

Conexões:
  ConsumableDatabase,
  ConsumableDefinition,

**## ConsumableService**

Variaveis:
  - _consumableDatabase: readonly IConsumableRepository;

Funções:
  + ConsumableService()
  + GetConsumable()
  + CanUseConsumable()

Conexões:
  IConsumableRepository,
  ConsumableDefinition,
  OwnedConsumableData,

**## IConsumableRepository**

Variaveis:

Funções:
  - GetById()
  - GetAll()

Conexões:
  ConsumableDefinition,

**## ConsumableDatabase**

Variaveis:
  + consumables: List<ConsumableDefinition>;

Funções:

Conexões:
  ConsumableDefinition,

**## ConsumableDefinition**

Variaveis:
  + Id: string;
  + Name: string;
  + Icon: Sprite;
  - Max_Level: [ReadOnly] public int;
  + EffectDefinition: EffectDefinition;
  + EffectData: EffectData;
  + Duration: float;
  + DurationAP: int;

Funções:
  - Tooltip()
  - Tooltip()
  - Header()
  - Header()
  - Tooltip()
  + UseConsumable()
  + GetDurationByLevel()

Conexões:
  EffectData,
  EffectDefinition,
  OwnedConsumableData,

**## ConditionData**

Variaveis:
  + Definition: ConditionDefinition;
  + ConditionType: ConditionType;

Funções:
  - Tooltip()
  - Tooltip()

Conexões:
  ConditionDefinition,

**## ConditionDefinition**

Variaveis:
  + Id: string;
  + DisplayName: string;
  + Description: string;

Funções:
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - OnValidate()

Conexões:

**## ICondition**

Variaveis:
  + OnChange: event Action<bool>;

Funções:
  + OnCombatEventReceive()
  + Initialize()

Conexões:
  CombatEvent,

**## NotHitRecentlyConditionDefinition**

Variaveis:

Funções:

Conexões:

**## IEventUser**

Variaveis:

Funções:
  - EventSubscribe()

Conexões:

**## NotHitRecentlyConditionRuntime**

Variaveis:
  - _waitTime: readonly float;
  - _timeScheduler: TimeScheduler;
  + OnChange: event Action<bool>;

Funções:
  + NotHitRecentlyConditionRuntime()
  + Initialize()
  + OnCombatEventReceive()
  - OnTimerCompleted()
  + Dispose()

Conexões:
  CombatEvent,
  TimeScheduler,

**## EffectData**

Variaveis:
  + MaxStacks: int;
  + EffectTargetType: EffectTargetType;

Funções:
  - Tooltip()
  - Tooltip()

Conexões:

**## EffectDefinition**

Variaveis:
  + Id: string;
  + DisplayName: string;
  + Description: string;
  + Icon: Sprite;
  + ModifierType: ModifierType;

Funções:
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  - Tooltip()
  + Execute()

Conexões:
  Stat,

**## IEffect**

Variaveis:

Funções:
  - Execute()

Conexões:

**## HealEffect**

Variaveis:

Funções:
  + Execute()

Conexões:
  PlayerRoot,
  PlayerNetworkState,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerHealth,

**## IncreaseAttackEffect**

Variaveis:

Funções:
  + Execute()

Conexões:
  PlayerNetworkState,
  PlayerAttack,

**## ReviveEffect**

Variaveis:

Funções:
  + Execute()

Conexões:
  PlayerNetworkState,
  PlayerHealth,

**## BuildPerkContext**

Variaveis:
  - _perks: readonly Dictionary<string, BuildPerkSummary>;

Funções:
  - new()
  + Add()
  + Remove()
  + Resolve()

Conexões:
  PerkDefinition,
  BuildPerkSummary,
  PlayerBuildStats,

**## BuildConsumableContext**

Variaveis:
  - _consumables: readonly Dictionary<string, BuildConsumableSummary>;

Funções:
  - new()
  + Add()
  + Remove()
  + Resolve()

Conexões:
  ConsumableDefinition,
  BuildConsumableSummary,
  PlayerBuildStats,

**## BuildConsumableSummary**

Variaveis:
  + Definition: ConsumableDefinition;
  + Level: int;

Funções:

Conexões:
  ConsumableDefinition,

**## BuildPerkSummary**

Variaveis:
  + Definition: PerkDefinition;
  + Level: int;

Funções:

Conexões:
  PerkDefinition,

**## PlayerBuildCollectionData**

Variaveis:
  + ActiveBuildId: string;
  + UnlockedBuildSlots: int;
  - _builds: readonly List<PlayerBuildData>;
  + Builds: List<PlayerBuildData>;

Funções:
  - new()
  + HasAvailableSlot()
  + AddBuild()
  + RemoveBuild()
  + GetActiveBuild()

Conexões:
  PlayerBuildData,

**## PlayerBuildData**

Variaveis:
  + BuildId: string;
  + BuildName: string;
  + EquippedEquipments: List<EquipmentSlotData>;
  + EquippedRunes: List<RuneSlotData>;
  + EquippedConsumables: List<ConsumableSlotData>;

Funções:
  + new()
  + new()
  + new()

Conexões:
  ConsumableSlotData,
  EquipmentSlotData,
  RuneSlotData,

**## PlayerBuildStats**

Variaveis:
  + PerkSummaryList: List<BuildPerkSummary>;
  + Consumables: List<BuildConsumableSummary>;

Funções:
  + new()
  + new()

Conexões:
  BuildConsumableSummary,
  BuildPerkSummary,

**## MMProgressBar**

Variaveis:
  + UssClassName: const string;
  + TrackUssClassName: const string;
  + FillUssClassName: const string;
  + BlueStripe: const string;
  + YellowStripe: const string;
  + GreenStripe: const string;
  + NitroStripe: const string;
  + TextUssClassName: const string;
  - _track: VisualElement;
  - _fill: VisualElement;
  - _progressText: MMText;
  - _minValue: float;
  - _maxValue: float;
  - _value: float;
  - _showCheck: bool;
  - _stripe: StripeVariant;

Funções:
  + MMProgressBar()
  + SetValue()
  - UpdateFill()

Conexões:
  MMText,

**## AH_Button**

Variaveis:

Funções:

Conexões:

**## MMIconButton**

Variaveis:

Funções:

Conexões:
  MMIcon,

**## MMTextButton**

Variaveis:

Funções:

Conexões:
  MMText,

**## OwnedConsumableData**

Variaveis:
  + ConsumableId: string;
  + Amount: int;
  + Current_level: int;

Funções:

Conexões:

**## OwnedEquipmentData**

Variaveis:
  + EquipmentId: string;
  + CurrentUpgradeLevel: int;

Funções:

Conexões:

**## OwnedRuneData**

Variaveis:
  + RuneInstanceId: string;
  + RuneId: string;
  + RuneLevel: int;

Funções:

Conexões:

**## PlayerConsumableData**

Variaveis:
  - _consumables: readonly Dictionary<string, OwnedConsumableData>;
  + Consumables: IReadOnlyDictionary<string, OwnedConsumableData>;

Funções:
  - new()
  + Contains()
  + TryGet()
  + Set()
  + Get()
  + GetByIndex()
  + Remove()

Conexões:
  OwnedConsumableData,

**## PlayerEquipmentData**

Variaveis:
  - _equipments: readonly Dictionary<string, OwnedEquipmentData>;
  + Equipments: IReadOnlyDictionary<string, OwnedEquipmentData>;

Funções:
  - new()
  + Contains()
  + TryGet()
  + Set()
  + Get()
  + Remove()

Conexões:
  OwnedEquipmentData,

**## PlayerInventoryData**

Variaveis:
  + OnInventoryChanged: event Action;
  - _items: readonly Dictionary<string, ItemStack>;
  + Items: IReadOnlyDictionary<string, ItemStack>;

Funções:
  - new()
  + TryGet()
  + Contains()
  + GetAmount()
  + Set()
  + Remove()
  + Clear()

Conexões:
  ItemStack,

**## PlayerProfileData**

Variaveis:

Funções:
  + PlayerProfileData()

Conexões:
  PlayerBaseStats,
  PlayerBuildCollectionData,
  PlayerBuildStats,
  PlayerConsumableData,
  PlayerEquipmentData,
  PlayerInventoryData,
  PlayerRuneData,

**## PlayerRuneData**

Variaveis:
  - _runes: readonly Dictionary<string, OwnedRuneData>;
  + Runes: IReadOnlyDictionary<string, OwnedRuneData>;

Funções:
  - new()
  + Contains()
  + TryGet()
  + Set()
  + Remove()

Conexões:
  OwnedRuneData,

**## MMGridView**

Variaveis:
  + GridContainerName: const string;
  + UssClassName: const string;
  + GridContainerUssClassName: const string;
  + GridContainerVerticalUssClassName: const string;
  + GridContainerHorizontalUssClassName: const string;
  - _gridContainer: readonly VisualElement;
  + contentContainer: override VisualElement;

Funções:
  + MMGridView()
  + MMGridView()
  - ApplyGridDirectionModifier()

Conexões:

**## MMTimer**

Variaveis:

Funções:

Conexões:
  MMIcon,
  MMText,

**## MMTimerTag**

Variaveis:

Funções:

Conexões:
  MMText,

**## MMIcon**

Variaveis:
  + UssClassName: const string;
  + PrimaryUssClassName: const string;
  - AppUIClassName: const string;
  - IconClassName: const string;
  - _iconName: string;
  - _size: IconSize;
  - _variant: IconVariant;

Funções:
  + MMIcon()
  + GetSizeUssClassName()
  - VariantToString()

Conexões:

**## MMText**

Variaveis:
  + UssClassName: const string;
  + UssShadowClassName: const string;
  + UssStrokeClassName: const string;
  + UssTextClassName: const string;
  + RemoveLocalizedText: const string;
  - _shadow: readonly Label;
  - _stroke: readonly Label;
  - _text: readonly Label;
  - _lineHeight: float;
  - m_TextValue: string;
  - m_TypographyStyle: TypographyStyle;
  - m_OutlineSize: TextOutlineSize;
  - m_HasShadow: bool;

Funções:
  + MMText()
  - GetOutlineClassName()
  - GetStyleClassName()

Conexões:

**## ScreenRootElement**

Variaveis:

Funções:
  + ScreenRootElement()

Conexões:

**## RuneSelectionContext**

Variaveis:
  + RuneDefinition: RuneDefinition;
  + OwnedRune: OwnedRuneData;
  + InfusedIn: string;

Funções:

Conexões:
  RuneDefinition,
  OwnedRuneData,

**## RuneSlotContext**

Variaveis:
  + BuildId: string;
  + EquipmentType: EquipmentType;
  + SlotIndex: int;
  + SlotType: RuneSlotType;

Funções:

Conexões:

**## RuneSlotViewData**

Variaveis:
  + Context: RuneSlotContext;
  + EquippedRune: RuneDefinition;
  + RuneLevel: int;
  + IsEmpty: bool;

Funções:

Conexões:
  RuneDefinition,
  RuneSlotContext,

**## EquipItemButton**

Variaveis:
  - UssName: const string;
  - ContainerClassName: const string;
  - TypeUssName: const string;
  - BeheUssName: const string;
  - ImageUssName: const string;
  - StatsUssName: const string;
  - RunesName: const string;
  - _container: VisualElement;
  - _equipTypeElement: VisualElement;
  - _equipBeheStats: VisualElement;
  - _equipImage: VisualElement;
  - _equipStats: VisualElement;
  - _equipRunes: VisualElement;
  - _equipType: EquipmentType;
  - _equipDefinition: EquipmentDefinition;
  - _runesCount: int;

Funções:
  + EquipItemButton()
  - Populate()
  + ClearSlot()
  - SetEquipImage()
  - SetRuneImage()

Conexões:
  EquipmentDefinition,

**## EquipmentSelectionItem**

Variaveis:
  - UssName: const string;
  - TextUssName: const string;
  - RuneContainerUssName: const string;
  - RuneUssName: const string;
  - _equipStat: Text;
  - _runeIconContainer: VisualElement;

Funções:
  + EquipmentSelectionItem()
  - CreateRuneIcon()
  + Populate()

Conexões:
  EquipmentDefinition,

**## EquipmentSelectionPopup**

Variaveis:
  - UssName: const string;
  - TitleClassName: const string;
  - UnequipButtonClassName: const string;
  - SelectionItemClassName: const string;
  - selectionPopupMode: SelectionPopupMode;
  + OnRuneSelectionSelected: event Action<RuneSelectionContext>;
  + OnEquipmentSelected: event Action<string>;
  - _title: Label;
  + _scrollView: ScrollView;
  + OnUnequipRuneButtonClicked: event Action<EquipmentType, int>;
  + OnUnequipEquipButtonClicked: event Action;

Funções:
  + EquipmentSelectionPopup()
  - CreateUnequipButton()
  + PopulatePlayerEquipments()
  + PopulatePlayerOwnedRunes()

Conexões:
  EquipmentSelectionItemStats,
  AH_Button,
  RuneSelectionContext,
  RuneSlotContext,
  EquipmentSelectionItem,
  RuneSelectionItem,

**## EquipmentStatusDrawer**

Variaveis:
  - UssName: const string;
  - MainContanierUssName: const string;
  + OnEquipButtonClicked: event Action;
  + OpenRuneSelectionPopup: event Action<RuneSlotContext>;
  + _DrawerEquipButton: AH_Button;
  - _EquipLevel: Text;
  - _EquipImage: VisualElement;
  - _EquipName: Text;
  - _EquipAtk: Text;
  - _EquipDesc: Text;
  - _EquipIntrisickRune: Text;
  - _RunesList: ScrollView;

Funções:
  + EquipmentStatusDrawer()
  + BindEquipButton()
  + PopulateEquipmentInformation()
  - BuildRuneButtons()

Conexões:
  EquipmentDefinition,
  EquipmentSelectionItemStats,
  AH_Button,
  RuneSlotContext,
  RuneSlotViewData,
  RuneSelectionItem,

**## RuneSelectionItem**

Variaveis:
  - Binding: const string;
  - UssName: const string;
  - RuneImageUss: const string;
  - RuneContentUss: const string;
  - RuneNameUss: const string;
  - RuneTypeUss: const string;
  - RuneInfusedUss: const string;
  - RuneDescriptionUss: const string;
  - _mode: RuneSelectionMode;
  + OnSlotClicked: event Action<RuneSlotContext>;
  + OnRuneSelectionClicked: event Action<RuneSelectionContext>;
  - _selectionContext: RuneSelectionContext;
  - RuneTypeImage: VisualElement;
  - Content: VisualElement;
  - _RuneName: Text;
  - _RuneTypeText: Text;
  - _RuneInfused: Text;
  - _RuneDescription: Text;
  - m_RuneSlotType: RuneSlotType;

Funções:
  + RuneSelectionItem()
  - HandleClick()
  + PopulateSlot()
  + PopulateSelection()

Conexões:
  RuneDefinition,
  RuneSelectionContext,
  RuneSlotContext,

**## ConsumableComponent**

Variaveis:
  - UssClass: const string;
  - InputValueClass: const string;
  - IconClass: const string;
  - QuantClass: const string;
  - BodyClass: const string;
  - BlockedClass: const string;
  + Id: string;
  + _KeyInput: Label;
  + _Icon: VisualElement;
  + _QuantLabel: Label;
  + _Body: VisualElement;
  + _BlockedContent: VisualElement;

Funções:
  + ConsumableComponent()
  + SetIconImage()
  + StartCooldownAnimation()

Conexões:

**## GatheringComponent**

Variaveis:
  - UssClass: const string;
  - BoxClass: const string;
  - KeyClass: const string;
  - BarClass: const string;
  - FillClass: const string;
  + _keyText: Label;
  + _bar: VisualElement;
  + _fill: VisualElement;

Funções:
  + GatheringComponent()
  + SetProgress()
  + SetMode()

Conexões:

**## PlayerDownedComponent**

Variaveis:
  - UssClass: const string;
  - FilledClass: const string;
  - FillClass: const string;
  + _fill: VisualElement;

Funções:
  + PlayerDownedComponent()
  + SetProgress()

Conexões:

**## ConsumablesView**

Variaveis:
  - viewModel: [SerializeField] private ConsumablesViewModel;
  - root: VisualElement;
  - ConsumableContainer: VisualElement;
  - Slot1: ConsumableComponent;
  - Slot2: ConsumableComponent;
  - Slot3: ConsumableComponent;
  - Slot4: ConsumableComponent;
  - SlotsDict: Dictionary<ConsumableComponent, ConsumableDefinition>;

Funções:
  - OnEnable()
  - TryCatch()
  - OnDisable()
  - InitConsumablesOnScreen()
  - UpdateConsumables()

Conexões:
  ConsumableDefinition,
  OwnedConsumableData,
  ConsumableComponent,
  ConsumablesViewModel,

**## ConsumablesViewModel**

Variaveis:
  + ConsumableSlot: ObservableValue<OwnedConsumableData>;
  - consumableService: ConsumableService;
  - currentActiveBuild: PlayerBuildData;
  - playerConsumables: PlayerConsumables;
  - tryCatchReferencies: Task;

Funções:
  + Initialize()
  + EventSubscribe()
  + Dispose()
  - UpdateConsumable()
  + GetEquippedConsumables()
  + GetConsumableDurationTime()
  + GetOwnedConsumable()

Conexões:
  ObservableValue,
  GameServices,
  PlayerRoot,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerProfileRuntime,
  PlayerConsumables,
  ConsumableService,
  ConsumableDefinition,
  PlayerBuildData,
  OwnedConsumableData,
  ConsumableSlotData,

**## HealthView**

Variaveis:
  - healthViewModel: [SerializeField] private HealthViewModel;
  - root: VisualElement;
  - hpFill: VisualElement;
  - hpText: Label;

Funções:
  + Start()
  - TryCatch()
  - OnDisable()
  - UpdateHealth()
  - GetPlayerMaxHealth()

Conexões:
  HealthViewModel,

**## HealthViewModel**

Variaveis:
  + Health: ObservableValue<int>;
  - combatEventDispatcher: CombatEventDispatcher;

Funções:
  + Initialize()
  + EventSubscribe()
  + Dispose()
  - OnHealthChanged()
  + GetPlayerMaxHealth()

Conexões:
  CombatEvent,
  CombatEventDispatcher,
  ObservableValue,
  PlayerRoot,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  PlayerHealth,

**## ShowPerksView**

Variaveis:
  - showPerksViewModel: [SerializeField] private ShowPerksViewModel;
  - root: VisualElement;
  - abilities: VisualElement;

Funções:
  + OnEnable()
  - TryCatch()
  - OnDisable()
  - UpdatePerks()
  - CreatePerkSlot()

Conexões:
  ShowPerksViewModel,
  PerkDisplayState,

**## ShowPerksViewModel**

Variaveis:
  + Perks: ObservableValue<List<PerkDisplayState>>;
  - combatStats: PlayerCombatStats;
  - runtimePerkList: List<CombatPerkInstance>;

Funções:
  + new()
  - new()
  + Initialize()
  - RefreshPerks()
  - OnPerkActiveChanged()
  + Dispose()

Conexões:
  ObservableValue,
  CombatPerkInstance,
  PlayerRoot,
  LocalPlayerRuntime,
  LocalPlayerRuntime,
  PlayerCombatStats,
  PlayerCombatStats,
  ICondition,
  EffectDefinition,
  PerkDisplayState,

**## PerkDisplayState**

Variaveis:
  + IsActive: bool;

Funções:
  + PerkDisplayState()

Conexões:

**## WorldUITracker**

Variaveis:
  - _panelRoot: readonly VisualElement;
  - _camera: Camera;

Funções:
  + WorldUITracker()

Conexões:
  main,

**## ConsumableSlotData**

Variaveis:
  + Id: string;

Funções:

Conexões:

**## EquipmentSlotData**

Variaveis:
  + ItemId: string;
  + EquipmentType: EquipmentType;

Funções:

Conexões:

**## RuneSlotData**

Variaveis:
  + EquipmentType: EquipmentType;
  + SlotIndex: int;
  + RuneInstanceId: string;

Funções:

Conexões:
