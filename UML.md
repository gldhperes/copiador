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

Conexões:
  RewardEntry,
  RewardResult,
  IItemRepository,
  InventoryService,

**## NetworkPlayerManager**

Variaveis:
  - _playerRuntimeRegistry: PlayerRuntimeRegistry;
  - spawnPointName: string;
  - cachedSpawnPoint: GameObject;
  - playerCount: int;
  - _players: readonly Dictionary<PlayerRef, PlayerSessionData>;
  - _playersDebug: List<PlayerDebugEntry>;
  + PlayerCount: int;

Funções:
  - Header()
  - new()
  - OnEnable()
  + OnSceneLoaded()
  + SetRuntimeRegistry()
  + ResetSession()
  - SearchPlayerSpawnPoint()
  + SpawnPlayer()
  + DespawnPlayer()
  + GetPlayerObject()
  + GetPlayerCount()
  - RefreshDebugPlayers()

Conexões:
  PlayerSessionData,
  PlayerDebugEntry,
  PlayerRuntimeRegistry,
  BuildCalculationService,
  GameServices,
  PlayerRoot,
  PlayerBuildLoader,
  PlayerProfileData,

**## PlayerSessionData**

Variaveis:
  + PlayerRef: PlayerRef;
  + NetworkObject: NetworkObject;

Funções:

Conexões:

**## PlayerDebugEntry**

Variaveis:
  + NetworkObject: NetworkObject;
  + PlayerSessionData: PlayerSessionData;

Funções:

Conexões:
  PlayerSessionData,

**## PlayerRuntimeRegistry**

Variaveis:
  - _profiles: readonly Dictionary<PlayerRef, PlayerProfileData>;
  - _profilesDebug: List<PlayerRuntimeDebugEntry>;

Funções:
  - new()
  - Header()
  + Unregister()
  + ResetSession()
  - RefreshDebug()

Conexões:
  PlayerRuntimeDebugEntry,
  PlayerProfileData,

**## PlayerRuntimeDebugEntry**

Variaveis:
  + Player: PlayerRef;
  + Profile: PlayerProfileData;

Funções:

Conexões:
  PlayerProfileData,

**## BuildDebugBootstrap**

Variaveis:
  + OwnedEquipments: List<OwnedEquipmentData>;
  + OwnedRunes: List<OwnedRuneData>;
  + OwnedConsumables: List<OwnedConsumableData>;
  + Builds: List<BuildDebugData>;

Funções:
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
  + EquippedEquipments: List<EquipmentSlotData>;
  + EquippedRunes: List<RuneSlotData>;
  + EquippedConsumables: List<ConsumableSlotData>;

Funções:
  + new()

Conexões:
  ConsumableSlotData,
  EquipmentSlotData,
  RuneSlotData,

**## BuildDebugRunner**

Variaveis:
  - _bootstrap: BuildDebugBootstrap;

Funções:
  - Awake()

Conexões:
  NetworkPlayerManager,
  BuildDebugBootstrap,
  EquipmentDatabase,
  BuildValidationService,
  PlayerBuildService,
  GameServices,
  EquipmentRepository,
  RuneRepository,
  RuneDatabase,
  PlayerRoot,

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
  - Range()
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
  - new()

Conexões:
  DropEntryDefinition,

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

Conexões:

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
  - Tooltip()

Conexões:
  DamageEntry,

**## WeaponData**

Variaveis:
  + weaponType: WeaponType;
  + lightAttack: AttackData;
  + heavyAttack: AttackData;

Funções:
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
  - profile: PlayerProfileData;

Funções:
  + Recalculate()
  - CalculateBaseStats()
  - CalculateEquipment()
  - CalculateRunes()
  - CalculateConsumables()

Conexões:
  GameServices,
  EquipmentService,
  PerkService,
  RuneService,
  PlayerBaseStats,
  BuildStatContext,
  ConsumableDefinition,
  ConsumableService,
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
  PlayerBuildData,
  PlayerProfileData,
  RuneSlotData,

**## PlayerBuildService**

Variaveis:
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
  PlayerBuildData,
  PlayerProfileData,
  EquipmentSlotData,
  RuneSlotData,

**## DropService**

Variaveis:
  - _itemRepository: readonly IItemRepository;
  - _dropTableRepository: readonly IDropTableRepository;

Funções:
  + DropService()
  + GetById()
  + Roll()

Conexões:
  RewardResult,
  DropEntryDefinition,
  DropTableDefinition,
  IDropTableRepository,
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

**## GameServices**

Variaveis:

Funções:
  + Spawned()
  + Initialize()
  - InitializeRepositorys()
  - InitializeSettingsServices()

Conexões:
  RewardService,
  DropTableDatabase,
  ItemDatabase,
  EquipmentDatabase,
  EquipmentProgressionDatabase,
  BehemothRepository,
  IBehemothRepository,
  BuildCalculationService,
  BuildValidationService,
  PlayerBuildService,
  DropService,
  DropTableRepository,
  IDropTableRepository,
  DatabasePaths,
  EquipmentRepository,
  EquipmentService,
  IEquipmentRepository,
  PerkService,
  ItemRepository,
  IRuneRepository,
  RuneRepository,
  RuneService,
  DisplaySettingsService,
  BehemothDatabase,
  RuneDatabase,
  CombatDamageService,
  InventoryService,
  ConsumableDatabase,
  ConsumableRepository,
  ConsumableService,
  IConsumableRepository,

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
  - _database: readonly IEquipmentRepository;
  - _progression: readonly EquipmentProgressionDatabase;

Funções:
  + EquipmentService()
  + HasEquipment()
  - TryGetPlayerquipamentData()
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
  BuildStatContext,
  OwnedEquipmentData,
  PlayerEquipmentData,
  PlayerProfileData,
  EquipmentSlotData,

**## IEquipmentRepository**

Variaveis:

Funções:
  - GetById()
  - GetAll()

Conexões:
  EquipmentDefinition,

**## PerkService**

Variaveis:

Funções:
  + ApplyIntrinsicPerks()
  - ApplyPerkStat()
  - ApplyEffectStat()

Conexões:
  EquipmentDefinition,
  EquipmentProgressionLevelData,
  GameServices,
  EquipmentService,
  PerkDefinition,
  BuildStatContext,
  ConditionData,
  EffectData,
  EffectDefinition,
  BuildPerkContext,
  PlayerProfileData,

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

**## RPC_Teste**

Variaveis:

Funções:
  - Rpc()
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
  GameServices,
  EquipmentService,
  PlayerRoot,
  PlayerBuildLoader,
  ConnectionHandler,
  PlayerBuildData,
  PlayerProfileData,

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
  BuildStatContext,
  BuildPerkContext,
  OwnedRuneData,
  PlayerProfileData,

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
  - new()
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
  GameServices,
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
  - Range()

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
  GameServices,
  BehemothController,
  HuntManager,

**## PerkData**

Variaveis:
  + InitialValue: int;
  + ValueAP: int;
  + ValueType: ValueType;

Funções:
  - Header()
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
  - Header()

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

Conexões:
  PerkDefinition,

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
  - LateUpdate()
  - HandleInput()
  - CalculatePosition()
  + SetTarget()

Conexões:
  PlayerMovement,

**## AttackDamageModifier**

Variaveis:

Funções:
  + Calculate()
  + ResolvePerks()

Conexões:
  CombatPerkInstance,
  ICondition,
  EffectDefinition,
  PlayerBuildStats,

**## CriticalChanceModifier**

Variaveis:

Funções:
  + Calculate()

Conexões:
  CombatPerkInstance,
  CombatPerkRuntime,
  EffectData,
  EffectDefinition,
  PlayerBuildStats,

**## CriticalDamageModifier**

Variaveis:

Funções:
  + Calculate()

Conexões:
  CombatPerkInstance,
  CombatPerkRuntime,
  EffectData,
  EffectDefinition,
  PlayerBuildStats,

**## DamageDealtModifier**

Variaveis:

Funções:
  + Calculate()

Conexões:
  CombatPerkInstance,
  CombatPerkRuntime,
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
  PlayerBuildStats,

**## DamageResult**

Variaveis:

Funções:
  + DamageResult()

Conexões:

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

**## HuntConfig**

Variaveis:
  + BehemothDatabase: BehemothDatabase;
  + DropTableDatabase: DropTableDatabase;
  + ItemDatabase: ItemDatabase;
  + BehemothIds: string[];
  + RespawnDelay: float;

Funções:
  - Header()

Conexões:
  DropTableDatabase,
  ItemDatabase,
  BehemothDatabase,

**## HuntManager**

Variaveis:
  - config: [SerializeField] private HuntConfig;
  + Config: HuntConfig;
  - areas: [SerializeField] private List<HuntArea>;
  - aliveBehemoths: [SerializeField] private HashSet<string>;
  + AliveBehemoths: HashSet<string>;

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
  BehemothController,
  BehemothDatabase,
  HuntArea,
  HuntConfig,

**## InventoryService**

Variaveis:
  - _inventoryData: readonly PlayerInventoryData;
  - _itemDatabase: readonly IItemRepository;

Funções:

Conexões:
  ItemDefinition,
  IItemRepository,
  ItemStack,
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
  + SetPlayerProfileData()
  + SetPlayerBuild()
  - Start()
  + UpdateCombatStats()

Conexões:
  RPC_Teste,
  PlayerNetworkState,
  PlayerCombatStats,
  PlayerConsumables,
  PlayerHealth,
  PlayerProfileData,

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

Conexões:

**## PlayerNetworkState**

Variaveis:

Funções:
  - Header()
  + Spawned()
  + SetDowned()
  + SetUsingConsumable()
  + SetGathering()

Conexões:

**## PlayerInputHandler**

Variaveis:

Funções:

Conexões:
  OrbitCamera,
  main,
  NetworkInputData,
  ConnectionHandler,

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

**## PlayerBuildLoader**

Variaveis:
  - _debugBootstrapGO: GameObject;
  - _debugBootstrap: BuildDebugBootstrap;
  - _useDebugBootstrap: bool;
  - Profile: PlayerProfileData;

Funções:
  + PlayerBuildLoader()
  - LoadDebugData()

Conexões:
  BuildDebugBootstrap,
  PlayerBuildData,
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
  EquipmentService,
  BehemothController,
  BehemothPart,
  CameraShake,
  CombatDamageService,
  DamageResult,
  main,
  PlayerRoot,
  NetworkInputData,
  LocalPlayerRuntime,
  PlayerCombatStats,
  ConnectionHandler,
  DamageAnimator,
  PlayerBuildStats,
  PlayerProfileData,
  EquipmentSlotData,

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
  + FixedUpdateNetwork()
  - Rpc()
  - RPC_UseSlot()
  - UpdateSlotTimers()
  - ExecuteConsumable()

Conexões:
  GameServices,
  PlayerRoot,
  NetworkInputData,
  PlayerNetworkState,
  LocalPlayerRuntime,
  PlayerCombatStats,
  CombatConsumableInstance,
  ConsumableUseState,
  ConnectionHandler,
  ConsumableDefinition,
  ConsumableService,
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
  - RPC_InteractTick()
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

**## CombatStats**

Variaveis:

Funções:
  + new()

Conexões:
  Stat,

**## DefenseStats**

Variaveis:

Funções:
  + new()

Conexões:
  Stat,

**## ElementalStats**

Variaveis:

Funções:
  + new()

Conexões:
  Stat,

**## PlayerStats**

Variaveis:
  - _stats: readonly Dictionary<StatType, Stat>;

Funções:
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
  + LoadScene()
  + Spawned()
  + StartConnectionAsync()
  + DisconnectAsync()
  - CleanupRunnerObject()
  + SetLocalPlayerInput()
  - OnShutdownEventListener()
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
  + OnSceneLoadDone()
  + OnSceneLoadStart()
  + OnObjectExitAOI()
  + OnObjectEnterAOI()

Conexões:
  NetworkPlayerManager,
  PlayerRuntimeRegistry,
  NetworkInputData,
  PlayerInputHandler,

**## InitializationHandler**

Variaveis:
  - _defaultLobbyName: [SerializeField] private string;
  - _lobbyMaxPlayers: [SerializeField] private int;
  - _initializeAsServer: [SerializeField] private bool;

Funções:
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

**## BuildScreen**

Variaveis:
  - _viewModel: [SerializeField] private BuildViewModel;
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
  - Awake()
  - OnEnable()
  - OnDisable()
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
  - Refresh_UI()
  - RefreshUIStatsContainer()
  - RefreshUIEquipments()
  - RefreshUIRunes()
  - BuildPerkComponent()
  - PupulateEquipItemButton()

Conexões:
  EquipmentDefinition,
  BuildViewModel,
  BuildPerkSummary,
  PlayerBuildData,
  PlayerBuildStats,
  PlayerProfileData,
  EquipItemButton,
  EquipmentSelectionPopup,
  EquipmentStatusDrawer,
  RuneSelectionItem,
  RuneSelectionContext,
  RuneSlotContext,
  AH_Button,

**## BuildViewModel**

Variaveis:
  + PlayerProfileData: ObservableValue<PlayerProfileData>;
  - _buildService: PlayerBuildService;
  - _BuildCalculationService: BuildCalculationService;
  - _validation: BuildValidationService;
  - _runeService: RuneService;
  - playerBuilds: [SerializeField] private List<PlayerBuildData>;

Funções:
  + Initialize()
  + SelectBuild()
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
  + GetPlayerBuildStats()

Conexões:
  ObservableValue,
  EquipmentDefinition,
  BuildCalculationService,
  BuildValidationService,
  PlayerBuildService,
  GameServices,
  EquipmentService,
  RPC_Teste,
  RuneService,
  RuneDefinition,
  PlayerRoot,
  EquipmentSelectionItemStats,
  PlayerBuildData,
  PlayerBuildStats,
  OwnedEquipmentData,
  OwnedRuneData,
  PlayerProfileData,
  EquipItemButton,
  RuneSelectionContext,
  RuneSlotContext,
  RuneSlotViewData,
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
  - Header()
  + UseConsumable()
  + GetDurationByLevel()

Conexões:
  EffectData,
  EffectDefinition,
  OwnedConsumableData,

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
  ConsumableDefinition,
  IConsumableRepository,
  OwnedConsumableData,

**## IConsumableRepository**

Variaveis:

Funções:
  - GetById()
  - GetAll()

Conexões:
  ConsumableDefinition,

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

**## ConditionData**

Variaveis:
  + Definition: ConditionDefinition;
  + ConditionType: ConditionType;

Funções:
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

**## EffectData**

Variaveis:
  + MaxStacks: int;
  + EffectTargetType: EffectTargetType;

Funções:
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
  + UnlockedBuildSlots: int;
  - _builds: [field: SerializeField] private List<PlayerBuildData>;
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

Conexões:
  ConsumableSlotData,
  EquipmentSlotData,
  RuneSlotData,

**## PlayerBuildStats**

Variaveis:
  - PerkSummaryList: [field: SerializeField] public List<BuildPerkSummary>;
  - ConsumablesList: [field: SerializeField] public List<BuildConsumableSummary>;
  - _conditions: readonly List<ICondition>;

Funções:
  - new()

Conexões:
  CombatPerkInstance,
  CombatConsumableInstance,
  ICondition,
  BuildConsumableSummary,
  BuildPerkSummary,

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
  - _ownedEquipments: [SerializeField] private List<OwnedEquipmentData>;
  + Equipments: IReadOnlyDictionary<string, OwnedEquipmentData>;

Funções:
  - new()
  + Contains()
  + TryGet()
  + Set()
  + Get()
  + Remove()
  - SyncInspectorList()

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
  + OnChanged: Action<PlayerProfileData>;

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
  + OnUnequipRuneButtonClicked: event Action<RuneSlotContext, int>;
  + OnUnequipEquipButtonClicked: event Action;

Funções:
  + EquipmentSelectionPopup()
  - CreateUnequipButton()
  + PopulatePlayerEquipments()
  + PopulatePlayerOwnedRunes()

Conexões:
  EquipmentSelectionItemStats,
  EquipmentSelectionItem,
  RuneSelectionItem,
  RuneSelectionContext,
  RuneSlotContext,
  AH_Button,

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
  RuneSelectionItem,
  RuneSlotContext,
  RuneSlotViewData,
  AH_Button,

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
  + EquipmentId: string;
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

Conexões:
  ObservableValue,
  GameServices,
  PlayerRoot,
  LocalPlayerRuntime,
  PlayerConsumables,
  ConsumableDefinition,
  ConsumableService,
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
  + Initialize()
  - RefreshPerks()
  - OnPerkActiveChanged()
  + Dispose()

Conexões:
  ObservableValue,
  CombatPerkInstance,
  PlayerRoot,
  LocalPlayerRuntime,
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
  - ApplyGridDirectionModifier()

Conexões:

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
