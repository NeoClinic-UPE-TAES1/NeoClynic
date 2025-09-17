
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Secretary
 * 
 */
export type Secretary = $Result.DefaultSelection<Prisma.$SecretaryPayload>
/**
 * Model Medic
 * 
 */
export type Medic = $Result.DefaultSelection<Prisma.$MedicPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Observation
 * 
 */
export type Observation = $Result.DefaultSelection<Prisma.$ObservationPayload>
/**
 * Model Consultation
 * 
 */
export type Consultation = $Result.DefaultSelection<Prisma.$ConsultationPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Secretaries
 * const secretaries = await prisma.secretary.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Secretaries
   * const secretaries = await prisma.secretary.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.secretary`: Exposes CRUD operations for the **Secretary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Secretaries
    * const secretaries = await prisma.secretary.findMany()
    * ```
    */
  get secretary(): Prisma.SecretaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medic`: Exposes CRUD operations for the **Medic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Medics
    * const medics = await prisma.medic.findMany()
    * ```
    */
  get medic(): Prisma.MedicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.observation`: Exposes CRUD operations for the **Observation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Observations
    * const observations = await prisma.observation.findMany()
    * ```
    */
  get observation(): Prisma.ObservationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultation`: Exposes CRUD operations for the **Consultation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultations
    * const consultations = await prisma.consultation.findMany()
    * ```
    */
  get consultation(): Prisma.ConsultationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.0
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Secretary: 'Secretary',
    Medic: 'Medic',
    Patient: 'Patient',
    Observation: 'Observation',
    Consultation: 'Consultation',
    Report: 'Report'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    postgres?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "secretary" | "medic" | "patient" | "observation" | "consultation" | "report"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Secretary: {
        payload: Prisma.$SecretaryPayload<ExtArgs>
        fields: Prisma.SecretaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecretaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecretaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>
          }
          findFirst: {
            args: Prisma.SecretaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecretaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>
          }
          findMany: {
            args: Prisma.SecretaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>[]
          }
          create: {
            args: Prisma.SecretaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>
          }
          createMany: {
            args: Prisma.SecretaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecretaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>[]
          }
          delete: {
            args: Prisma.SecretaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>
          }
          update: {
            args: Prisma.SecretaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>
          }
          deleteMany: {
            args: Prisma.SecretaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecretaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SecretaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>[]
          }
          upsert: {
            args: Prisma.SecretaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecretaryPayload>
          }
          aggregate: {
            args: Prisma.SecretaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecretary>
          }
          groupBy: {
            args: Prisma.SecretaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecretaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecretaryCountArgs<ExtArgs>
            result: $Utils.Optional<SecretaryCountAggregateOutputType> | number
          }
        }
      }
      Medic: {
        payload: Prisma.$MedicPayload<ExtArgs>
        fields: Prisma.MedicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>
          }
          findFirst: {
            args: Prisma.MedicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>
          }
          findMany: {
            args: Prisma.MedicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>[]
          }
          create: {
            args: Prisma.MedicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>
          }
          createMany: {
            args: Prisma.MedicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>[]
          }
          delete: {
            args: Prisma.MedicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>
          }
          update: {
            args: Prisma.MedicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>
          }
          deleteMany: {
            args: Prisma.MedicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>[]
          }
          upsert: {
            args: Prisma.MedicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicPayload>
          }
          aggregate: {
            args: Prisma.MedicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedic>
          }
          groupBy: {
            args: Prisma.MedicGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicCountArgs<ExtArgs>
            result: $Utils.Optional<MedicCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Observation: {
        payload: Prisma.$ObservationPayload<ExtArgs>
        fields: Prisma.ObservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ObservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ObservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          findFirst: {
            args: Prisma.ObservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ObservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          findMany: {
            args: Prisma.ObservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>[]
          }
          create: {
            args: Prisma.ObservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          createMany: {
            args: Prisma.ObservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ObservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>[]
          }
          delete: {
            args: Prisma.ObservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          update: {
            args: Prisma.ObservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          deleteMany: {
            args: Prisma.ObservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ObservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ObservationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>[]
          }
          upsert: {
            args: Prisma.ObservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          aggregate: {
            args: Prisma.ObservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateObservation>
          }
          groupBy: {
            args: Prisma.ObservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ObservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ObservationCountArgs<ExtArgs>
            result: $Utils.Optional<ObservationCountAggregateOutputType> | number
          }
        }
      }
      Consultation: {
        payload: Prisma.$ConsultationPayload<ExtArgs>
        fields: Prisma.ConsultationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findFirst: {
            args: Prisma.ConsultationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findMany: {
            args: Prisma.ConsultationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          create: {
            args: Prisma.ConsultationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          createMany: {
            args: Prisma.ConsultationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsultationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          delete: {
            args: Prisma.ConsultationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          update: {
            args: Prisma.ConsultationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsultationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          upsert: {
            args: Prisma.ConsultationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          aggregate: {
            args: Prisma.ConsultationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultation>
          }
          groupBy: {
            args: Prisma.ConsultationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    secretary?: SecretaryOmit
    medic?: MedicOmit
    patient?: PatientOmit
    observation?: ObservationOmit
    consultation?: ConsultationOmit
    report?: ReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MedicCountOutputType
   */

  export type MedicCountOutputType = {
    consultation: number
  }

  export type MedicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | MedicCountOutputTypeCountConsultationArgs
  }

  // Custom InputTypes
  /**
   * MedicCountOutputType without action
   */
  export type MedicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicCountOutputType
     */
    select?: MedicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MedicCountOutputType without action
   */
  export type MedicCountOutputTypeCountConsultationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    consultation: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | PatientCountOutputTypeCountConsultationArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountConsultationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Secretary
   */

  export type AggregateSecretary = {
    _count: SecretaryCountAggregateOutputType | null
    _min: SecretaryMinAggregateOutputType | null
    _max: SecretaryMaxAggregateOutputType | null
  }

  export type SecretaryMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type SecretaryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type SecretaryCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    _all: number
  }


  export type SecretaryMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type SecretaryMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type SecretaryCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    _all?: true
  }

  export type SecretaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Secretary to aggregate.
     */
    where?: SecretaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Secretaries to fetch.
     */
    orderBy?: SecretaryOrderByWithRelationInput | SecretaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecretaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Secretaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Secretaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Secretaries
    **/
    _count?: true | SecretaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecretaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecretaryMaxAggregateInputType
  }

  export type GetSecretaryAggregateType<T extends SecretaryAggregateArgs> = {
        [P in keyof T & keyof AggregateSecretary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecretary[P]>
      : GetScalarType<T[P], AggregateSecretary[P]>
  }




  export type SecretaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecretaryWhereInput
    orderBy?: SecretaryOrderByWithAggregationInput | SecretaryOrderByWithAggregationInput[]
    by: SecretaryScalarFieldEnum[] | SecretaryScalarFieldEnum
    having?: SecretaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecretaryCountAggregateInputType | true
    _min?: SecretaryMinAggregateInputType
    _max?: SecretaryMaxAggregateInputType
  }

  export type SecretaryGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    _count: SecretaryCountAggregateOutputType | null
    _min: SecretaryMinAggregateOutputType | null
    _max: SecretaryMaxAggregateOutputType | null
  }

  type GetSecretaryGroupByPayload<T extends SecretaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecretaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecretaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecretaryGroupByOutputType[P]>
            : GetScalarType<T[P], SecretaryGroupByOutputType[P]>
        }
      >
    >


  export type SecretarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["secretary"]>

  export type SecretarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["secretary"]>

  export type SecretarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["secretary"]>

  export type SecretarySelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }

  export type SecretaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password", ExtArgs["result"]["secretary"]>

  export type $SecretaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Secretary"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
    }, ExtArgs["result"]["secretary"]>
    composites: {}
  }

  type SecretaryGetPayload<S extends boolean | null | undefined | SecretaryDefaultArgs> = $Result.GetResult<Prisma.$SecretaryPayload, S>

  type SecretaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SecretaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SecretaryCountAggregateInputType | true
    }

  export interface SecretaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Secretary'], meta: { name: 'Secretary' } }
    /**
     * Find zero or one Secretary that matches the filter.
     * @param {SecretaryFindUniqueArgs} args - Arguments to find a Secretary
     * @example
     * // Get one Secretary
     * const secretary = await prisma.secretary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecretaryFindUniqueArgs>(args: SelectSubset<T, SecretaryFindUniqueArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Secretary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SecretaryFindUniqueOrThrowArgs} args - Arguments to find a Secretary
     * @example
     * // Get one Secretary
     * const secretary = await prisma.secretary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecretaryFindUniqueOrThrowArgs>(args: SelectSubset<T, SecretaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Secretary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretaryFindFirstArgs} args - Arguments to find a Secretary
     * @example
     * // Get one Secretary
     * const secretary = await prisma.secretary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecretaryFindFirstArgs>(args?: SelectSubset<T, SecretaryFindFirstArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Secretary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretaryFindFirstOrThrowArgs} args - Arguments to find a Secretary
     * @example
     * // Get one Secretary
     * const secretary = await prisma.secretary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecretaryFindFirstOrThrowArgs>(args?: SelectSubset<T, SecretaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Secretaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Secretaries
     * const secretaries = await prisma.secretary.findMany()
     * 
     * // Get first 10 Secretaries
     * const secretaries = await prisma.secretary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const secretaryWithIdOnly = await prisma.secretary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecretaryFindManyArgs>(args?: SelectSubset<T, SecretaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Secretary.
     * @param {SecretaryCreateArgs} args - Arguments to create a Secretary.
     * @example
     * // Create one Secretary
     * const Secretary = await prisma.secretary.create({
     *   data: {
     *     // ... data to create a Secretary
     *   }
     * })
     * 
     */
    create<T extends SecretaryCreateArgs>(args: SelectSubset<T, SecretaryCreateArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Secretaries.
     * @param {SecretaryCreateManyArgs} args - Arguments to create many Secretaries.
     * @example
     * // Create many Secretaries
     * const secretary = await prisma.secretary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecretaryCreateManyArgs>(args?: SelectSubset<T, SecretaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Secretaries and returns the data saved in the database.
     * @param {SecretaryCreateManyAndReturnArgs} args - Arguments to create many Secretaries.
     * @example
     * // Create many Secretaries
     * const secretary = await prisma.secretary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Secretaries and only return the `id`
     * const secretaryWithIdOnly = await prisma.secretary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecretaryCreateManyAndReturnArgs>(args?: SelectSubset<T, SecretaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Secretary.
     * @param {SecretaryDeleteArgs} args - Arguments to delete one Secretary.
     * @example
     * // Delete one Secretary
     * const Secretary = await prisma.secretary.delete({
     *   where: {
     *     // ... filter to delete one Secretary
     *   }
     * })
     * 
     */
    delete<T extends SecretaryDeleteArgs>(args: SelectSubset<T, SecretaryDeleteArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Secretary.
     * @param {SecretaryUpdateArgs} args - Arguments to update one Secretary.
     * @example
     * // Update one Secretary
     * const secretary = await prisma.secretary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecretaryUpdateArgs>(args: SelectSubset<T, SecretaryUpdateArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Secretaries.
     * @param {SecretaryDeleteManyArgs} args - Arguments to filter Secretaries to delete.
     * @example
     * // Delete a few Secretaries
     * const { count } = await prisma.secretary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecretaryDeleteManyArgs>(args?: SelectSubset<T, SecretaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Secretaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Secretaries
     * const secretary = await prisma.secretary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecretaryUpdateManyArgs>(args: SelectSubset<T, SecretaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Secretaries and returns the data updated in the database.
     * @param {SecretaryUpdateManyAndReturnArgs} args - Arguments to update many Secretaries.
     * @example
     * // Update many Secretaries
     * const secretary = await prisma.secretary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Secretaries and only return the `id`
     * const secretaryWithIdOnly = await prisma.secretary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SecretaryUpdateManyAndReturnArgs>(args: SelectSubset<T, SecretaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Secretary.
     * @param {SecretaryUpsertArgs} args - Arguments to update or create a Secretary.
     * @example
     * // Update or create a Secretary
     * const secretary = await prisma.secretary.upsert({
     *   create: {
     *     // ... data to create a Secretary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Secretary we want to update
     *   }
     * })
     */
    upsert<T extends SecretaryUpsertArgs>(args: SelectSubset<T, SecretaryUpsertArgs<ExtArgs>>): Prisma__SecretaryClient<$Result.GetResult<Prisma.$SecretaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Secretaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretaryCountArgs} args - Arguments to filter Secretaries to count.
     * @example
     * // Count the number of Secretaries
     * const count = await prisma.secretary.count({
     *   where: {
     *     // ... the filter for the Secretaries we want to count
     *   }
     * })
    **/
    count<T extends SecretaryCountArgs>(
      args?: Subset<T, SecretaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecretaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Secretary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecretaryAggregateArgs>(args: Subset<T, SecretaryAggregateArgs>): Prisma.PrismaPromise<GetSecretaryAggregateType<T>>

    /**
     * Group by Secretary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecretaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecretaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecretaryGroupByArgs['orderBy'] }
        : { orderBy?: SecretaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecretaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecretaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Secretary model
   */
  readonly fields: SecretaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Secretary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecretaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Secretary model
   */
  interface SecretaryFieldRefs {
    readonly id: FieldRef<"Secretary", 'String'>
    readonly name: FieldRef<"Secretary", 'String'>
    readonly email: FieldRef<"Secretary", 'String'>
    readonly password: FieldRef<"Secretary", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Secretary findUnique
   */
  export type SecretaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * Filter, which Secretary to fetch.
     */
    where: SecretaryWhereUniqueInput
  }

  /**
   * Secretary findUniqueOrThrow
   */
  export type SecretaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * Filter, which Secretary to fetch.
     */
    where: SecretaryWhereUniqueInput
  }

  /**
   * Secretary findFirst
   */
  export type SecretaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * Filter, which Secretary to fetch.
     */
    where?: SecretaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Secretaries to fetch.
     */
    orderBy?: SecretaryOrderByWithRelationInput | SecretaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Secretaries.
     */
    cursor?: SecretaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Secretaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Secretaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Secretaries.
     */
    distinct?: SecretaryScalarFieldEnum | SecretaryScalarFieldEnum[]
  }

  /**
   * Secretary findFirstOrThrow
   */
  export type SecretaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * Filter, which Secretary to fetch.
     */
    where?: SecretaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Secretaries to fetch.
     */
    orderBy?: SecretaryOrderByWithRelationInput | SecretaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Secretaries.
     */
    cursor?: SecretaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Secretaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Secretaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Secretaries.
     */
    distinct?: SecretaryScalarFieldEnum | SecretaryScalarFieldEnum[]
  }

  /**
   * Secretary findMany
   */
  export type SecretaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * Filter, which Secretaries to fetch.
     */
    where?: SecretaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Secretaries to fetch.
     */
    orderBy?: SecretaryOrderByWithRelationInput | SecretaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Secretaries.
     */
    cursor?: SecretaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Secretaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Secretaries.
     */
    skip?: number
    distinct?: SecretaryScalarFieldEnum | SecretaryScalarFieldEnum[]
  }

  /**
   * Secretary create
   */
  export type SecretaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * The data needed to create a Secretary.
     */
    data: XOR<SecretaryCreateInput, SecretaryUncheckedCreateInput>
  }

  /**
   * Secretary createMany
   */
  export type SecretaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Secretaries.
     */
    data: SecretaryCreateManyInput | SecretaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Secretary createManyAndReturn
   */
  export type SecretaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * The data used to create many Secretaries.
     */
    data: SecretaryCreateManyInput | SecretaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Secretary update
   */
  export type SecretaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * The data needed to update a Secretary.
     */
    data: XOR<SecretaryUpdateInput, SecretaryUncheckedUpdateInput>
    /**
     * Choose, which Secretary to update.
     */
    where: SecretaryWhereUniqueInput
  }

  /**
   * Secretary updateMany
   */
  export type SecretaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Secretaries.
     */
    data: XOR<SecretaryUpdateManyMutationInput, SecretaryUncheckedUpdateManyInput>
    /**
     * Filter which Secretaries to update
     */
    where?: SecretaryWhereInput
    /**
     * Limit how many Secretaries to update.
     */
    limit?: number
  }

  /**
   * Secretary updateManyAndReturn
   */
  export type SecretaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * The data used to update Secretaries.
     */
    data: XOR<SecretaryUpdateManyMutationInput, SecretaryUncheckedUpdateManyInput>
    /**
     * Filter which Secretaries to update
     */
    where?: SecretaryWhereInput
    /**
     * Limit how many Secretaries to update.
     */
    limit?: number
  }

  /**
   * Secretary upsert
   */
  export type SecretaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * The filter to search for the Secretary to update in case it exists.
     */
    where: SecretaryWhereUniqueInput
    /**
     * In case the Secretary found by the `where` argument doesn't exist, create a new Secretary with this data.
     */
    create: XOR<SecretaryCreateInput, SecretaryUncheckedCreateInput>
    /**
     * In case the Secretary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecretaryUpdateInput, SecretaryUncheckedUpdateInput>
  }

  /**
   * Secretary delete
   */
  export type SecretaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
    /**
     * Filter which Secretary to delete.
     */
    where: SecretaryWhereUniqueInput
  }

  /**
   * Secretary deleteMany
   */
  export type SecretaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Secretaries to delete
     */
    where?: SecretaryWhereInput
    /**
     * Limit how many Secretaries to delete.
     */
    limit?: number
  }

  /**
   * Secretary without action
   */
  export type SecretaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Secretary
     */
    select?: SecretarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Secretary
     */
    omit?: SecretaryOmit<ExtArgs> | null
  }


  /**
   * Model Medic
   */

  export type AggregateMedic = {
    _count: MedicCountAggregateOutputType | null
    _min: MedicMinAggregateOutputType | null
    _max: MedicMaxAggregateOutputType | null
  }

  export type MedicMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    specialty: string | null
  }

  export type MedicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    specialty: string | null
  }

  export type MedicCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    specialty: number
    _all: number
  }


  export type MedicMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    specialty?: true
  }

  export type MedicMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    specialty?: true
  }

  export type MedicCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    specialty?: true
    _all?: true
  }

  export type MedicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medic to aggregate.
     */
    where?: MedicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medics to fetch.
     */
    orderBy?: MedicOrderByWithRelationInput | MedicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Medics
    **/
    _count?: true | MedicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicMaxAggregateInputType
  }

  export type GetMedicAggregateType<T extends MedicAggregateArgs> = {
        [P in keyof T & keyof AggregateMedic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedic[P]>
      : GetScalarType<T[P], AggregateMedic[P]>
  }




  export type MedicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicWhereInput
    orderBy?: MedicOrderByWithAggregationInput | MedicOrderByWithAggregationInput[]
    by: MedicScalarFieldEnum[] | MedicScalarFieldEnum
    having?: MedicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicCountAggregateInputType | true
    _min?: MedicMinAggregateInputType
    _max?: MedicMaxAggregateInputType
  }

  export type MedicGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    specialty: string
    _count: MedicCountAggregateOutputType | null
    _min: MedicMinAggregateOutputType | null
    _max: MedicMaxAggregateOutputType | null
  }

  type GetMedicGroupByPayload<T extends MedicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicGroupByOutputType[P]>
            : GetScalarType<T[P], MedicGroupByOutputType[P]>
        }
      >
    >


  export type MedicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    specialty?: boolean
    consultation?: boolean | Medic$consultationArgs<ExtArgs>
    _count?: boolean | MedicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medic"]>

  export type MedicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    specialty?: boolean
  }, ExtArgs["result"]["medic"]>

  export type MedicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    specialty?: boolean
  }, ExtArgs["result"]["medic"]>

  export type MedicSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    specialty?: boolean
  }

  export type MedicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "specialty", ExtArgs["result"]["medic"]>
  export type MedicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | Medic$consultationArgs<ExtArgs>
    _count?: boolean | MedicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MedicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MedicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MedicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Medic"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      specialty: string
    }, ExtArgs["result"]["medic"]>
    composites: {}
  }

  type MedicGetPayload<S extends boolean | null | undefined | MedicDefaultArgs> = $Result.GetResult<Prisma.$MedicPayload, S>

  type MedicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicCountAggregateInputType | true
    }

  export interface MedicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Medic'], meta: { name: 'Medic' } }
    /**
     * Find zero or one Medic that matches the filter.
     * @param {MedicFindUniqueArgs} args - Arguments to find a Medic
     * @example
     * // Get one Medic
     * const medic = await prisma.medic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicFindUniqueArgs>(args: SelectSubset<T, MedicFindUniqueArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Medic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicFindUniqueOrThrowArgs} args - Arguments to find a Medic
     * @example
     * // Get one Medic
     * const medic = await prisma.medic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicFindFirstArgs} args - Arguments to find a Medic
     * @example
     * // Get one Medic
     * const medic = await prisma.medic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicFindFirstArgs>(args?: SelectSubset<T, MedicFindFirstArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicFindFirstOrThrowArgs} args - Arguments to find a Medic
     * @example
     * // Get one Medic
     * const medic = await prisma.medic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Medics
     * const medics = await prisma.medic.findMany()
     * 
     * // Get first 10 Medics
     * const medics = await prisma.medic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicWithIdOnly = await prisma.medic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicFindManyArgs>(args?: SelectSubset<T, MedicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Medic.
     * @param {MedicCreateArgs} args - Arguments to create a Medic.
     * @example
     * // Create one Medic
     * const Medic = await prisma.medic.create({
     *   data: {
     *     // ... data to create a Medic
     *   }
     * })
     * 
     */
    create<T extends MedicCreateArgs>(args: SelectSubset<T, MedicCreateArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Medics.
     * @param {MedicCreateManyArgs} args - Arguments to create many Medics.
     * @example
     * // Create many Medics
     * const medic = await prisma.medic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicCreateManyArgs>(args?: SelectSubset<T, MedicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Medics and returns the data saved in the database.
     * @param {MedicCreateManyAndReturnArgs} args - Arguments to create many Medics.
     * @example
     * // Create many Medics
     * const medic = await prisma.medic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Medics and only return the `id`
     * const medicWithIdOnly = await prisma.medic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Medic.
     * @param {MedicDeleteArgs} args - Arguments to delete one Medic.
     * @example
     * // Delete one Medic
     * const Medic = await prisma.medic.delete({
     *   where: {
     *     // ... filter to delete one Medic
     *   }
     * })
     * 
     */
    delete<T extends MedicDeleteArgs>(args: SelectSubset<T, MedicDeleteArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Medic.
     * @param {MedicUpdateArgs} args - Arguments to update one Medic.
     * @example
     * // Update one Medic
     * const medic = await prisma.medic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicUpdateArgs>(args: SelectSubset<T, MedicUpdateArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Medics.
     * @param {MedicDeleteManyArgs} args - Arguments to filter Medics to delete.
     * @example
     * // Delete a few Medics
     * const { count } = await prisma.medic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicDeleteManyArgs>(args?: SelectSubset<T, MedicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Medics
     * const medic = await prisma.medic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicUpdateManyArgs>(args: SelectSubset<T, MedicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medics and returns the data updated in the database.
     * @param {MedicUpdateManyAndReturnArgs} args - Arguments to update many Medics.
     * @example
     * // Update many Medics
     * const medic = await prisma.medic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Medics and only return the `id`
     * const medicWithIdOnly = await prisma.medic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Medic.
     * @param {MedicUpsertArgs} args - Arguments to update or create a Medic.
     * @example
     * // Update or create a Medic
     * const medic = await prisma.medic.upsert({
     *   create: {
     *     // ... data to create a Medic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Medic we want to update
     *   }
     * })
     */
    upsert<T extends MedicUpsertArgs>(args: SelectSubset<T, MedicUpsertArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Medics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicCountArgs} args - Arguments to filter Medics to count.
     * @example
     * // Count the number of Medics
     * const count = await prisma.medic.count({
     *   where: {
     *     // ... the filter for the Medics we want to count
     *   }
     * })
    **/
    count<T extends MedicCountArgs>(
      args?: Subset<T, MedicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Medic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicAggregateArgs>(args: Subset<T, MedicAggregateArgs>): Prisma.PrismaPromise<GetMedicAggregateType<T>>

    /**
     * Group by Medic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicGroupByArgs['orderBy'] }
        : { orderBy?: MedicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Medic model
   */
  readonly fields: MedicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Medic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends Medic$consultationArgs<ExtArgs> = {}>(args?: Subset<T, Medic$consultationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Medic model
   */
  interface MedicFieldRefs {
    readonly id: FieldRef<"Medic", 'String'>
    readonly name: FieldRef<"Medic", 'String'>
    readonly email: FieldRef<"Medic", 'String'>
    readonly password: FieldRef<"Medic", 'String'>
    readonly specialty: FieldRef<"Medic", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Medic findUnique
   */
  export type MedicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * Filter, which Medic to fetch.
     */
    where: MedicWhereUniqueInput
  }

  /**
   * Medic findUniqueOrThrow
   */
  export type MedicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * Filter, which Medic to fetch.
     */
    where: MedicWhereUniqueInput
  }

  /**
   * Medic findFirst
   */
  export type MedicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * Filter, which Medic to fetch.
     */
    where?: MedicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medics to fetch.
     */
    orderBy?: MedicOrderByWithRelationInput | MedicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medics.
     */
    cursor?: MedicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medics.
     */
    distinct?: MedicScalarFieldEnum | MedicScalarFieldEnum[]
  }

  /**
   * Medic findFirstOrThrow
   */
  export type MedicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * Filter, which Medic to fetch.
     */
    where?: MedicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medics to fetch.
     */
    orderBy?: MedicOrderByWithRelationInput | MedicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medics.
     */
    cursor?: MedicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medics.
     */
    distinct?: MedicScalarFieldEnum | MedicScalarFieldEnum[]
  }

  /**
   * Medic findMany
   */
  export type MedicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * Filter, which Medics to fetch.
     */
    where?: MedicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medics to fetch.
     */
    orderBy?: MedicOrderByWithRelationInput | MedicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Medics.
     */
    cursor?: MedicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medics.
     */
    skip?: number
    distinct?: MedicScalarFieldEnum | MedicScalarFieldEnum[]
  }

  /**
   * Medic create
   */
  export type MedicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * The data needed to create a Medic.
     */
    data: XOR<MedicCreateInput, MedicUncheckedCreateInput>
  }

  /**
   * Medic createMany
   */
  export type MedicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Medics.
     */
    data: MedicCreateManyInput | MedicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Medic createManyAndReturn
   */
  export type MedicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * The data used to create many Medics.
     */
    data: MedicCreateManyInput | MedicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Medic update
   */
  export type MedicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * The data needed to update a Medic.
     */
    data: XOR<MedicUpdateInput, MedicUncheckedUpdateInput>
    /**
     * Choose, which Medic to update.
     */
    where: MedicWhereUniqueInput
  }

  /**
   * Medic updateMany
   */
  export type MedicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Medics.
     */
    data: XOR<MedicUpdateManyMutationInput, MedicUncheckedUpdateManyInput>
    /**
     * Filter which Medics to update
     */
    where?: MedicWhereInput
    /**
     * Limit how many Medics to update.
     */
    limit?: number
  }

  /**
   * Medic updateManyAndReturn
   */
  export type MedicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * The data used to update Medics.
     */
    data: XOR<MedicUpdateManyMutationInput, MedicUncheckedUpdateManyInput>
    /**
     * Filter which Medics to update
     */
    where?: MedicWhereInput
    /**
     * Limit how many Medics to update.
     */
    limit?: number
  }

  /**
   * Medic upsert
   */
  export type MedicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * The filter to search for the Medic to update in case it exists.
     */
    where: MedicWhereUniqueInput
    /**
     * In case the Medic found by the `where` argument doesn't exist, create a new Medic with this data.
     */
    create: XOR<MedicCreateInput, MedicUncheckedCreateInput>
    /**
     * In case the Medic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicUpdateInput, MedicUncheckedUpdateInput>
  }

  /**
   * Medic delete
   */
  export type MedicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
    /**
     * Filter which Medic to delete.
     */
    where: MedicWhereUniqueInput
  }

  /**
   * Medic deleteMany
   */
  export type MedicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medics to delete
     */
    where?: MedicWhereInput
    /**
     * Limit how many Medics to delete.
     */
    limit?: number
  }

  /**
   * Medic.consultation
   */
  export type Medic$consultationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Medic without action
   */
  export type MedicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medic
     */
    select?: MedicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medic
     */
    omit?: MedicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    name: string | null
    birthDay: Date | null
    sex: string | null
    cpf: string | null
    ethnicity: string | null
    email: string | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    birthDay: Date | null
    sex: string | null
    cpf: string | null
    ethnicity: string | null
    email: string | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    name: number
    birthDay: number
    sex: number
    cpf: number
    ethnicity: number
    email: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    name?: true
    birthDay?: true
    sex?: true
    cpf?: true
    ethnicity?: true
    email?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    name?: true
    birthDay?: true
    sex?: true
    cpf?: true
    ethnicity?: true
    email?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    name?: true
    birthDay?: true
    sex?: true
    cpf?: true
    ethnicity?: true
    email?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    name: string
    birthDay: Date
    sex: string
    cpf: string
    ethnicity: string
    email: string | null
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDay?: boolean
    sex?: boolean
    cpf?: boolean
    ethnicity?: boolean
    email?: boolean
    observation?: boolean | Patient$observationArgs<ExtArgs>
    consultation?: boolean | Patient$consultationArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDay?: boolean
    sex?: boolean
    cpf?: boolean
    ethnicity?: boolean
    email?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDay?: boolean
    sex?: boolean
    cpf?: boolean
    ethnicity?: boolean
    email?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    name?: boolean
    birthDay?: boolean
    sex?: boolean
    cpf?: boolean
    ethnicity?: boolean
    email?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "birthDay" | "sex" | "cpf" | "ethnicity" | "email", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observation?: boolean | Patient$observationArgs<ExtArgs>
    consultation?: boolean | Patient$consultationArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      observation: Prisma.$ObservationPayload<ExtArgs> | null
      consultation: Prisma.$ConsultationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      birthDay: Date
      sex: string
      cpf: string
      ethnicity: string
      email: string | null
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    observation<T extends Patient$observationArgs<ExtArgs> = {}>(args?: Subset<T, Patient$observationArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    consultation<T extends Patient$consultationArgs<ExtArgs> = {}>(args?: Subset<T, Patient$consultationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly birthDay: FieldRef<"Patient", 'DateTime'>
    readonly sex: FieldRef<"Patient", 'String'>
    readonly cpf: FieldRef<"Patient", 'String'>
    readonly ethnicity: FieldRef<"Patient", 'String'>
    readonly email: FieldRef<"Patient", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.observation
   */
  export type Patient$observationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    where?: ObservationWhereInput
  }

  /**
   * Patient.consultation
   */
  export type Patient$consultationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Observation
   */

  export type AggregateObservation = {
    _count: ObservationCountAggregateOutputType | null
    _min: ObservationMinAggregateOutputType | null
    _max: ObservationMaxAggregateOutputType | null
  }

  export type ObservationMinAggregateOutputType = {
    id: string | null
    comorbidity: string | null
    allergies: string | null
    medications: string | null
    patientId: string | null
  }

  export type ObservationMaxAggregateOutputType = {
    id: string | null
    comorbidity: string | null
    allergies: string | null
    medications: string | null
    patientId: string | null
  }

  export type ObservationCountAggregateOutputType = {
    id: number
    comorbidity: number
    allergies: number
    medications: number
    patientId: number
    _all: number
  }


  export type ObservationMinAggregateInputType = {
    id?: true
    comorbidity?: true
    allergies?: true
    medications?: true
    patientId?: true
  }

  export type ObservationMaxAggregateInputType = {
    id?: true
    comorbidity?: true
    allergies?: true
    medications?: true
    patientId?: true
  }

  export type ObservationCountAggregateInputType = {
    id?: true
    comorbidity?: true
    allergies?: true
    medications?: true
    patientId?: true
    _all?: true
  }

  export type ObservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Observation to aggregate.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Observations
    **/
    _count?: true | ObservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ObservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ObservationMaxAggregateInputType
  }

  export type GetObservationAggregateType<T extends ObservationAggregateArgs> = {
        [P in keyof T & keyof AggregateObservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateObservation[P]>
      : GetScalarType<T[P], AggregateObservation[P]>
  }




  export type ObservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObservationWhereInput
    orderBy?: ObservationOrderByWithAggregationInput | ObservationOrderByWithAggregationInput[]
    by: ObservationScalarFieldEnum[] | ObservationScalarFieldEnum
    having?: ObservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ObservationCountAggregateInputType | true
    _min?: ObservationMinAggregateInputType
    _max?: ObservationMaxAggregateInputType
  }

  export type ObservationGroupByOutputType = {
    id: string
    comorbidity: string
    allergies: string
    medications: string
    patientId: string
    _count: ObservationCountAggregateOutputType | null
    _min: ObservationMinAggregateOutputType | null
    _max: ObservationMaxAggregateOutputType | null
  }

  type GetObservationGroupByPayload<T extends ObservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ObservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ObservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ObservationGroupByOutputType[P]>
            : GetScalarType<T[P], ObservationGroupByOutputType[P]>
        }
      >
    >


  export type ObservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comorbidity?: boolean
    allergies?: boolean
    medications?: boolean
    patientId?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["observation"]>

  export type ObservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comorbidity?: boolean
    allergies?: boolean
    medications?: boolean
    patientId?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["observation"]>

  export type ObservationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comorbidity?: boolean
    allergies?: boolean
    medications?: boolean
    patientId?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["observation"]>

  export type ObservationSelectScalar = {
    id?: boolean
    comorbidity?: boolean
    allergies?: boolean
    medications?: boolean
    patientId?: boolean
  }

  export type ObservationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "comorbidity" | "allergies" | "medications" | "patientId", ExtArgs["result"]["observation"]>
  export type ObservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type ObservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type ObservationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $ObservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Observation"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comorbidity: string
      allergies: string
      medications: string
      patientId: string
    }, ExtArgs["result"]["observation"]>
    composites: {}
  }

  type ObservationGetPayload<S extends boolean | null | undefined | ObservationDefaultArgs> = $Result.GetResult<Prisma.$ObservationPayload, S>

  type ObservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ObservationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ObservationCountAggregateInputType | true
    }

  export interface ObservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Observation'], meta: { name: 'Observation' } }
    /**
     * Find zero or one Observation that matches the filter.
     * @param {ObservationFindUniqueArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ObservationFindUniqueArgs>(args: SelectSubset<T, ObservationFindUniqueArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Observation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ObservationFindUniqueOrThrowArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ObservationFindUniqueOrThrowArgs>(args: SelectSubset<T, ObservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Observation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationFindFirstArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ObservationFindFirstArgs>(args?: SelectSubset<T, ObservationFindFirstArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Observation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationFindFirstOrThrowArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ObservationFindFirstOrThrowArgs>(args?: SelectSubset<T, ObservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Observations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Observations
     * const observations = await prisma.observation.findMany()
     * 
     * // Get first 10 Observations
     * const observations = await prisma.observation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const observationWithIdOnly = await prisma.observation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ObservationFindManyArgs>(args?: SelectSubset<T, ObservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Observation.
     * @param {ObservationCreateArgs} args - Arguments to create a Observation.
     * @example
     * // Create one Observation
     * const Observation = await prisma.observation.create({
     *   data: {
     *     // ... data to create a Observation
     *   }
     * })
     * 
     */
    create<T extends ObservationCreateArgs>(args: SelectSubset<T, ObservationCreateArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Observations.
     * @param {ObservationCreateManyArgs} args - Arguments to create many Observations.
     * @example
     * // Create many Observations
     * const observation = await prisma.observation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ObservationCreateManyArgs>(args?: SelectSubset<T, ObservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Observations and returns the data saved in the database.
     * @param {ObservationCreateManyAndReturnArgs} args - Arguments to create many Observations.
     * @example
     * // Create many Observations
     * const observation = await prisma.observation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Observations and only return the `id`
     * const observationWithIdOnly = await prisma.observation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ObservationCreateManyAndReturnArgs>(args?: SelectSubset<T, ObservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Observation.
     * @param {ObservationDeleteArgs} args - Arguments to delete one Observation.
     * @example
     * // Delete one Observation
     * const Observation = await prisma.observation.delete({
     *   where: {
     *     // ... filter to delete one Observation
     *   }
     * })
     * 
     */
    delete<T extends ObservationDeleteArgs>(args: SelectSubset<T, ObservationDeleteArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Observation.
     * @param {ObservationUpdateArgs} args - Arguments to update one Observation.
     * @example
     * // Update one Observation
     * const observation = await prisma.observation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ObservationUpdateArgs>(args: SelectSubset<T, ObservationUpdateArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Observations.
     * @param {ObservationDeleteManyArgs} args - Arguments to filter Observations to delete.
     * @example
     * // Delete a few Observations
     * const { count } = await prisma.observation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ObservationDeleteManyArgs>(args?: SelectSubset<T, ObservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Observations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Observations
     * const observation = await prisma.observation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ObservationUpdateManyArgs>(args: SelectSubset<T, ObservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Observations and returns the data updated in the database.
     * @param {ObservationUpdateManyAndReturnArgs} args - Arguments to update many Observations.
     * @example
     * // Update many Observations
     * const observation = await prisma.observation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Observations and only return the `id`
     * const observationWithIdOnly = await prisma.observation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ObservationUpdateManyAndReturnArgs>(args: SelectSubset<T, ObservationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Observation.
     * @param {ObservationUpsertArgs} args - Arguments to update or create a Observation.
     * @example
     * // Update or create a Observation
     * const observation = await prisma.observation.upsert({
     *   create: {
     *     // ... data to create a Observation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Observation we want to update
     *   }
     * })
     */
    upsert<T extends ObservationUpsertArgs>(args: SelectSubset<T, ObservationUpsertArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Observations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationCountArgs} args - Arguments to filter Observations to count.
     * @example
     * // Count the number of Observations
     * const count = await prisma.observation.count({
     *   where: {
     *     // ... the filter for the Observations we want to count
     *   }
     * })
    **/
    count<T extends ObservationCountArgs>(
      args?: Subset<T, ObservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ObservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Observation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ObservationAggregateArgs>(args: Subset<T, ObservationAggregateArgs>): Prisma.PrismaPromise<GetObservationAggregateType<T>>

    /**
     * Group by Observation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ObservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ObservationGroupByArgs['orderBy'] }
        : { orderBy?: ObservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ObservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetObservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Observation model
   */
  readonly fields: ObservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Observation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ObservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Observation model
   */
  interface ObservationFieldRefs {
    readonly id: FieldRef<"Observation", 'String'>
    readonly comorbidity: FieldRef<"Observation", 'String'>
    readonly allergies: FieldRef<"Observation", 'String'>
    readonly medications: FieldRef<"Observation", 'String'>
    readonly patientId: FieldRef<"Observation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Observation findUnique
   */
  export type ObservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation findUniqueOrThrow
   */
  export type ObservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation findFirst
   */
  export type ObservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Observations.
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Observations.
     */
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * Observation findFirstOrThrow
   */
  export type ObservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Observations.
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Observations.
     */
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * Observation findMany
   */
  export type ObservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observations to fetch.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Observations.
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * Observation create
   */
  export type ObservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * The data needed to create a Observation.
     */
    data: XOR<ObservationCreateInput, ObservationUncheckedCreateInput>
  }

  /**
   * Observation createMany
   */
  export type ObservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Observations.
     */
    data: ObservationCreateManyInput | ObservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Observation createManyAndReturn
   */
  export type ObservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * The data used to create many Observations.
     */
    data: ObservationCreateManyInput | ObservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Observation update
   */
  export type ObservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * The data needed to update a Observation.
     */
    data: XOR<ObservationUpdateInput, ObservationUncheckedUpdateInput>
    /**
     * Choose, which Observation to update.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation updateMany
   */
  export type ObservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Observations.
     */
    data: XOR<ObservationUpdateManyMutationInput, ObservationUncheckedUpdateManyInput>
    /**
     * Filter which Observations to update
     */
    where?: ObservationWhereInput
    /**
     * Limit how many Observations to update.
     */
    limit?: number
  }

  /**
   * Observation updateManyAndReturn
   */
  export type ObservationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * The data used to update Observations.
     */
    data: XOR<ObservationUpdateManyMutationInput, ObservationUncheckedUpdateManyInput>
    /**
     * Filter which Observations to update
     */
    where?: ObservationWhereInput
    /**
     * Limit how many Observations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Observation upsert
   */
  export type ObservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * The filter to search for the Observation to update in case it exists.
     */
    where: ObservationWhereUniqueInput
    /**
     * In case the Observation found by the `where` argument doesn't exist, create a new Observation with this data.
     */
    create: XOR<ObservationCreateInput, ObservationUncheckedCreateInput>
    /**
     * In case the Observation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ObservationUpdateInput, ObservationUncheckedUpdateInput>
  }

  /**
   * Observation delete
   */
  export type ObservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter which Observation to delete.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation deleteMany
   */
  export type ObservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Observations to delete
     */
    where?: ObservationWhereInput
    /**
     * Limit how many Observations to delete.
     */
    limit?: number
  }

  /**
   * Observation without action
   */
  export type ObservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Observation
     */
    omit?: ObservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
  }


  /**
   * Model Consultation
   */

  export type AggregateConsultation = {
    _count: ConsultationCountAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  export type ConsultationMinAggregateOutputType = {
    id: string | null
    date: Date | null
    followUp: boolean | null
    medicId: string | null
    patientId: string | null
  }

  export type ConsultationMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    followUp: boolean | null
    medicId: string | null
    patientId: string | null
  }

  export type ConsultationCountAggregateOutputType = {
    id: number
    date: number
    followUp: number
    medicId: number
    patientId: number
    _all: number
  }


  export type ConsultationMinAggregateInputType = {
    id?: true
    date?: true
    followUp?: true
    medicId?: true
    patientId?: true
  }

  export type ConsultationMaxAggregateInputType = {
    id?: true
    date?: true
    followUp?: true
    medicId?: true
    patientId?: true
  }

  export type ConsultationCountAggregateInputType = {
    id?: true
    date?: true
    followUp?: true
    medicId?: true
    patientId?: true
    _all?: true
  }

  export type ConsultationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultation to aggregate.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consultations
    **/
    _count?: true | ConsultationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationMaxAggregateInputType
  }

  export type GetConsultationAggregateType<T extends ConsultationAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultation[P]>
      : GetScalarType<T[P], AggregateConsultation[P]>
  }




  export type ConsultationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithAggregationInput | ConsultationOrderByWithAggregationInput[]
    by: ConsultationScalarFieldEnum[] | ConsultationScalarFieldEnum
    having?: ConsultationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationCountAggregateInputType | true
    _min?: ConsultationMinAggregateInputType
    _max?: ConsultationMaxAggregateInputType
  }

  export type ConsultationGroupByOutputType = {
    id: string
    date: Date
    followUp: boolean
    medicId: string
    patientId: string
    _count: ConsultationCountAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  type GetConsultationGroupByPayload<T extends ConsultationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    followUp?: boolean
    medicId?: boolean
    patientId?: boolean
    Report?: boolean | Consultation$ReportArgs<ExtArgs>
    medic?: boolean | MedicDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    followUp?: boolean
    medicId?: boolean
    patientId?: boolean
    medic?: boolean | MedicDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    followUp?: boolean
    medicId?: boolean
    patientId?: boolean
    medic?: boolean | MedicDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>

  export type ConsultationSelectScalar = {
    id?: boolean
    date?: boolean
    followUp?: boolean
    medicId?: boolean
    patientId?: boolean
  }

  export type ConsultationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "followUp" | "medicId" | "patientId", ExtArgs["result"]["consultation"]>
  export type ConsultationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Report?: boolean | Consultation$ReportArgs<ExtArgs>
    medic?: boolean | MedicDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type ConsultationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medic?: boolean | MedicDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type ConsultationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medic?: boolean | MedicDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $ConsultationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consultation"
    objects: {
      Report: Prisma.$ReportPayload<ExtArgs> | null
      medic: Prisma.$MedicPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      followUp: boolean
      medicId: string
      patientId: string
    }, ExtArgs["result"]["consultation"]>
    composites: {}
  }

  type ConsultationGetPayload<S extends boolean | null | undefined | ConsultationDefaultArgs> = $Result.GetResult<Prisma.$ConsultationPayload, S>

  type ConsultationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationCountAggregateInputType | true
    }

  export interface ConsultationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consultation'], meta: { name: 'Consultation' } }
    /**
     * Find zero or one Consultation that matches the filter.
     * @param {ConsultationFindUniqueArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationFindUniqueArgs>(args: SelectSubset<T, ConsultationFindUniqueArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consultation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationFindUniqueOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationFindFirstArgs>(args?: SelectSubset<T, ConsultationFindFirstArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultations
     * const consultations = await prisma.consultation.findMany()
     * 
     * // Get first 10 Consultations
     * const consultations = await prisma.consultation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultationWithIdOnly = await prisma.consultation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsultationFindManyArgs>(args?: SelectSubset<T, ConsultationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consultation.
     * @param {ConsultationCreateArgs} args - Arguments to create a Consultation.
     * @example
     * // Create one Consultation
     * const Consultation = await prisma.consultation.create({
     *   data: {
     *     // ... data to create a Consultation
     *   }
     * })
     * 
     */
    create<T extends ConsultationCreateArgs>(args: SelectSubset<T, ConsultationCreateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultations.
     * @param {ConsultationCreateManyArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationCreateManyArgs>(args?: SelectSubset<T, ConsultationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consultations and returns the data saved in the database.
     * @param {ConsultationCreateManyAndReturnArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsultationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsultationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consultation.
     * @param {ConsultationDeleteArgs} args - Arguments to delete one Consultation.
     * @example
     * // Delete one Consultation
     * const Consultation = await prisma.consultation.delete({
     *   where: {
     *     // ... filter to delete one Consultation
     *   }
     * })
     * 
     */
    delete<T extends ConsultationDeleteArgs>(args: SelectSubset<T, ConsultationDeleteArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consultation.
     * @param {ConsultationUpdateArgs} args - Arguments to update one Consultation.
     * @example
     * // Update one Consultation
     * const consultation = await prisma.consultation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationUpdateArgs>(args: SelectSubset<T, ConsultationUpdateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultations.
     * @param {ConsultationDeleteManyArgs} args - Arguments to filter Consultations to delete.
     * @example
     * // Delete a few Consultations
     * const { count } = await prisma.consultation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationDeleteManyArgs>(args?: SelectSubset<T, ConsultationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationUpdateManyArgs>(args: SelectSubset<T, ConsultationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations and returns the data updated in the database.
     * @param {ConsultationUpdateManyAndReturnArgs} args - Arguments to update many Consultations.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consultations and only return the `id`
     * const consultationWithIdOnly = await prisma.consultation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsultationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsultationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consultation.
     * @param {ConsultationUpsertArgs} args - Arguments to update or create a Consultation.
     * @example
     * // Update or create a Consultation
     * const consultation = await prisma.consultation.upsert({
     *   create: {
     *     // ... data to create a Consultation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consultation we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationUpsertArgs>(args: SelectSubset<T, ConsultationUpsertArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationCountArgs} args - Arguments to filter Consultations to count.
     * @example
     * // Count the number of Consultations
     * const count = await prisma.consultation.count({
     *   where: {
     *     // ... the filter for the Consultations we want to count
     *   }
     * })
    **/
    count<T extends ConsultationCountArgs>(
      args?: Subset<T, ConsultationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationAggregateArgs>(args: Subset<T, ConsultationAggregateArgs>): Prisma.PrismaPromise<GetConsultationAggregateType<T>>

    /**
     * Group by Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consultation model
   */
  readonly fields: ConsultationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consultation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Report<T extends Consultation$ReportArgs<ExtArgs> = {}>(args?: Subset<T, Consultation$ReportArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    medic<T extends MedicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicDefaultArgs<ExtArgs>>): Prisma__MedicClient<$Result.GetResult<Prisma.$MedicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consultation model
   */
  interface ConsultationFieldRefs {
    readonly id: FieldRef<"Consultation", 'String'>
    readonly date: FieldRef<"Consultation", 'DateTime'>
    readonly followUp: FieldRef<"Consultation", 'Boolean'>
    readonly medicId: FieldRef<"Consultation", 'String'>
    readonly patientId: FieldRef<"Consultation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Consultation findUnique
   */
  export type ConsultationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findUniqueOrThrow
   */
  export type ConsultationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findFirst
   */
  export type ConsultationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findFirstOrThrow
   */
  export type ConsultationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findMany
   */
  export type ConsultationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultations to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation create
   */
  export type ConsultationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to create a Consultation.
     */
    data: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
  }

  /**
   * Consultation createMany
   */
  export type ConsultationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consultation createManyAndReturn
   */
  export type ConsultationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation update
   */
  export type ConsultationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to update a Consultation.
     */
    data: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
    /**
     * Choose, which Consultation to update.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation updateMany
   */
  export type ConsultationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
  }

  /**
   * Consultation updateManyAndReturn
   */
  export type ConsultationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consultation upsert
   */
  export type ConsultationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The filter to search for the Consultation to update in case it exists.
     */
    where: ConsultationWhereUniqueInput
    /**
     * In case the Consultation found by the `where` argument doesn't exist, create a new Consultation with this data.
     */
    create: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
    /**
     * In case the Consultation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
  }

  /**
   * Consultation delete
   */
  export type ConsultationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter which Consultation to delete.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation deleteMany
   */
  export type ConsultationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultations to delete
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to delete.
     */
    limit?: number
  }

  /**
   * Consultation.Report
   */
  export type Consultation$ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
  }

  /**
   * Consultation without action
   */
  export type ConsultationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    description: string | null
    diagnosis: string | null
    prescription: string | null
    consultationId: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    description: string | null
    diagnosis: string | null
    prescription: string | null
    consultationId: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    description: number
    diagnosis: number
    prescription: number
    consultationId: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    description?: true
    diagnosis?: true
    prescription?: true
    consultationId?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    description?: true
    diagnosis?: true
    prescription?: true
    consultationId?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    description?: true
    diagnosis?: true
    prescription?: true
    consultationId?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    description: string
    diagnosis: string
    prescription: string
    consultationId: string
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    diagnosis?: boolean
    prescription?: boolean
    consultationId?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    diagnosis?: boolean
    prescription?: boolean
    consultationId?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    diagnosis?: boolean
    prescription?: boolean
    consultationId?: boolean
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    description?: boolean
    diagnosis?: boolean
    prescription?: boolean
    consultationId?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "diagnosis" | "prescription" | "consultationId", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultation?: boolean | ConsultationDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      consultation: Prisma.$ConsultationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      diagnosis: string
      prescription: string
      consultationId: string
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultation<T extends ConsultationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDefaultArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly description: FieldRef<"Report", 'String'>
    readonly diagnosis: FieldRef<"Report", 'String'>
    readonly prescription: FieldRef<"Report", 'String'>
    readonly consultationId: FieldRef<"Report", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SecretaryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password'
  };

  export type SecretaryScalarFieldEnum = (typeof SecretaryScalarFieldEnum)[keyof typeof SecretaryScalarFieldEnum]


  export const MedicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    specialty: 'specialty'
  };

  export type MedicScalarFieldEnum = (typeof MedicScalarFieldEnum)[keyof typeof MedicScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    birthDay: 'birthDay',
    sex: 'sex',
    cpf: 'cpf',
    ethnicity: 'ethnicity',
    email: 'email'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const ObservationScalarFieldEnum: {
    id: 'id',
    comorbidity: 'comorbidity',
    allergies: 'allergies',
    medications: 'medications',
    patientId: 'patientId'
  };

  export type ObservationScalarFieldEnum = (typeof ObservationScalarFieldEnum)[keyof typeof ObservationScalarFieldEnum]


  export const ConsultationScalarFieldEnum: {
    id: 'id',
    date: 'date',
    followUp: 'followUp',
    medicId: 'medicId',
    patientId: 'patientId'
  };

  export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    description: 'description',
    diagnosis: 'diagnosis',
    prescription: 'prescription',
    consultationId: 'consultationId'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type SecretaryWhereInput = {
    AND?: SecretaryWhereInput | SecretaryWhereInput[]
    OR?: SecretaryWhereInput[]
    NOT?: SecretaryWhereInput | SecretaryWhereInput[]
    id?: StringFilter<"Secretary"> | string
    name?: StringFilter<"Secretary"> | string
    email?: StringFilter<"Secretary"> | string
    password?: StringFilter<"Secretary"> | string
  }

  export type SecretaryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type SecretaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: SecretaryWhereInput | SecretaryWhereInput[]
    OR?: SecretaryWhereInput[]
    NOT?: SecretaryWhereInput | SecretaryWhereInput[]
    name?: StringFilter<"Secretary"> | string
    password?: StringFilter<"Secretary"> | string
  }, "id" | "email">

  export type SecretaryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: SecretaryCountOrderByAggregateInput
    _max?: SecretaryMaxOrderByAggregateInput
    _min?: SecretaryMinOrderByAggregateInput
  }

  export type SecretaryScalarWhereWithAggregatesInput = {
    AND?: SecretaryScalarWhereWithAggregatesInput | SecretaryScalarWhereWithAggregatesInput[]
    OR?: SecretaryScalarWhereWithAggregatesInput[]
    NOT?: SecretaryScalarWhereWithAggregatesInput | SecretaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Secretary"> | string
    name?: StringWithAggregatesFilter<"Secretary"> | string
    email?: StringWithAggregatesFilter<"Secretary"> | string
    password?: StringWithAggregatesFilter<"Secretary"> | string
  }

  export type MedicWhereInput = {
    AND?: MedicWhereInput | MedicWhereInput[]
    OR?: MedicWhereInput[]
    NOT?: MedicWhereInput | MedicWhereInput[]
    id?: StringFilter<"Medic"> | string
    name?: StringFilter<"Medic"> | string
    email?: StringFilter<"Medic"> | string
    password?: StringFilter<"Medic"> | string
    specialty?: StringFilter<"Medic"> | string
    consultation?: ConsultationListRelationFilter
  }

  export type MedicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    specialty?: SortOrder
    consultation?: ConsultationOrderByRelationAggregateInput
  }

  export type MedicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: MedicWhereInput | MedicWhereInput[]
    OR?: MedicWhereInput[]
    NOT?: MedicWhereInput | MedicWhereInput[]
    name?: StringFilter<"Medic"> | string
    password?: StringFilter<"Medic"> | string
    specialty?: StringFilter<"Medic"> | string
    consultation?: ConsultationListRelationFilter
  }, "id" | "email">

  export type MedicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    specialty?: SortOrder
    _count?: MedicCountOrderByAggregateInput
    _max?: MedicMaxOrderByAggregateInput
    _min?: MedicMinOrderByAggregateInput
  }

  export type MedicScalarWhereWithAggregatesInput = {
    AND?: MedicScalarWhereWithAggregatesInput | MedicScalarWhereWithAggregatesInput[]
    OR?: MedicScalarWhereWithAggregatesInput[]
    NOT?: MedicScalarWhereWithAggregatesInput | MedicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Medic"> | string
    name?: StringWithAggregatesFilter<"Medic"> | string
    email?: StringWithAggregatesFilter<"Medic"> | string
    password?: StringWithAggregatesFilter<"Medic"> | string
    specialty?: StringWithAggregatesFilter<"Medic"> | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    name?: StringFilter<"Patient"> | string
    birthDay?: DateTimeFilter<"Patient"> | Date | string
    sex?: StringFilter<"Patient"> | string
    cpf?: StringFilter<"Patient"> | string
    ethnicity?: StringFilter<"Patient"> | string
    email?: StringNullableFilter<"Patient"> | string | null
    observation?: XOR<ObservationNullableScalarRelationFilter, ObservationWhereInput> | null
    consultation?: ConsultationListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    birthDay?: SortOrder
    sex?: SortOrder
    cpf?: SortOrder
    ethnicity?: SortOrder
    email?: SortOrderInput | SortOrder
    observation?: ObservationOrderByWithRelationInput
    consultation?: ConsultationOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cpf?: string
    email?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    birthDay?: DateTimeFilter<"Patient"> | Date | string
    sex?: StringFilter<"Patient"> | string
    ethnicity?: StringFilter<"Patient"> | string
    observation?: XOR<ObservationNullableScalarRelationFilter, ObservationWhereInput> | null
    consultation?: ConsultationListRelationFilter
  }, "id" | "cpf" | "email">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    birthDay?: SortOrder
    sex?: SortOrder
    cpf?: SortOrder
    ethnicity?: SortOrder
    email?: SortOrderInput | SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    name?: StringWithAggregatesFilter<"Patient"> | string
    birthDay?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    sex?: StringWithAggregatesFilter<"Patient"> | string
    cpf?: StringWithAggregatesFilter<"Patient"> | string
    ethnicity?: StringWithAggregatesFilter<"Patient"> | string
    email?: StringNullableWithAggregatesFilter<"Patient"> | string | null
  }

  export type ObservationWhereInput = {
    AND?: ObservationWhereInput | ObservationWhereInput[]
    OR?: ObservationWhereInput[]
    NOT?: ObservationWhereInput | ObservationWhereInput[]
    id?: StringFilter<"Observation"> | string
    comorbidity?: StringFilter<"Observation"> | string
    allergies?: StringFilter<"Observation"> | string
    medications?: StringFilter<"Observation"> | string
    patientId?: StringFilter<"Observation"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type ObservationOrderByWithRelationInput = {
    id?: SortOrder
    comorbidity?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    patientId?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type ObservationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    patientId?: string
    AND?: ObservationWhereInput | ObservationWhereInput[]
    OR?: ObservationWhereInput[]
    NOT?: ObservationWhereInput | ObservationWhereInput[]
    comorbidity?: StringFilter<"Observation"> | string
    allergies?: StringFilter<"Observation"> | string
    medications?: StringFilter<"Observation"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id" | "patientId">

  export type ObservationOrderByWithAggregationInput = {
    id?: SortOrder
    comorbidity?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    patientId?: SortOrder
    _count?: ObservationCountOrderByAggregateInput
    _max?: ObservationMaxOrderByAggregateInput
    _min?: ObservationMinOrderByAggregateInput
  }

  export type ObservationScalarWhereWithAggregatesInput = {
    AND?: ObservationScalarWhereWithAggregatesInput | ObservationScalarWhereWithAggregatesInput[]
    OR?: ObservationScalarWhereWithAggregatesInput[]
    NOT?: ObservationScalarWhereWithAggregatesInput | ObservationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Observation"> | string
    comorbidity?: StringWithAggregatesFilter<"Observation"> | string
    allergies?: StringWithAggregatesFilter<"Observation"> | string
    medications?: StringWithAggregatesFilter<"Observation"> | string
    patientId?: StringWithAggregatesFilter<"Observation"> | string
  }

  export type ConsultationWhereInput = {
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    id?: StringFilter<"Consultation"> | string
    date?: DateTimeFilter<"Consultation"> | Date | string
    followUp?: BoolFilter<"Consultation"> | boolean
    medicId?: StringFilter<"Consultation"> | string
    patientId?: StringFilter<"Consultation"> | string
    Report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    medic?: XOR<MedicScalarRelationFilter, MedicWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type ConsultationOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    medicId?: SortOrder
    patientId?: SortOrder
    Report?: ReportOrderByWithRelationInput
    medic?: MedicOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
  }

  export type ConsultationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    date?: DateTimeFilter<"Consultation"> | Date | string
    followUp?: BoolFilter<"Consultation"> | boolean
    medicId?: StringFilter<"Consultation"> | string
    patientId?: StringFilter<"Consultation"> | string
    Report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    medic?: XOR<MedicScalarRelationFilter, MedicWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id">

  export type ConsultationOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    medicId?: SortOrder
    patientId?: SortOrder
    _count?: ConsultationCountOrderByAggregateInput
    _max?: ConsultationMaxOrderByAggregateInput
    _min?: ConsultationMinOrderByAggregateInput
  }

  export type ConsultationScalarWhereWithAggregatesInput = {
    AND?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    OR?: ConsultationScalarWhereWithAggregatesInput[]
    NOT?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Consultation"> | string
    date?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    followUp?: BoolWithAggregatesFilter<"Consultation"> | boolean
    medicId?: StringWithAggregatesFilter<"Consultation"> | string
    patientId?: StringWithAggregatesFilter<"Consultation"> | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    diagnosis?: StringFilter<"Report"> | string
    prescription?: StringFilter<"Report"> | string
    consultationId?: StringFilter<"Report"> | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    diagnosis?: SortOrder
    prescription?: SortOrder
    consultationId?: SortOrder
    consultation?: ConsultationOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    consultationId?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    description?: StringFilter<"Report"> | string
    diagnosis?: StringFilter<"Report"> | string
    prescription?: StringFilter<"Report"> | string
    consultation?: XOR<ConsultationScalarRelationFilter, ConsultationWhereInput>
  }, "id" | "consultationId">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    diagnosis?: SortOrder
    prescription?: SortOrder
    consultationId?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    description?: StringWithAggregatesFilter<"Report"> | string
    diagnosis?: StringWithAggregatesFilter<"Report"> | string
    prescription?: StringWithAggregatesFilter<"Report"> | string
    consultationId?: StringWithAggregatesFilter<"Report"> | string
  }

  export type SecretaryCreateInput = {
    id?: string
    name: string
    email: string
    password: string
  }

  export type SecretaryUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
  }

  export type SecretaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type SecretaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type SecretaryCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
  }

  export type SecretaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type SecretaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type MedicCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    specialty: string
    consultation?: ConsultationCreateNestedManyWithoutMedicInput
  }

  export type MedicUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    specialty: string
    consultation?: ConsultationUncheckedCreateNestedManyWithoutMedicInput
  }

  export type MedicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    consultation?: ConsultationUpdateManyWithoutMedicNestedInput
  }

  export type MedicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    consultation?: ConsultationUncheckedUpdateManyWithoutMedicNestedInput
  }

  export type MedicCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    specialty: string
  }

  export type MedicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
  }

  export type MedicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
  }

  export type PatientCreateInput = {
    id?: string
    name: string
    birthDay: Date | string
    sex: string
    cpf: string
    ethnicity: string
    email?: string | null
    observation?: ObservationCreateNestedOneWithoutPatientInput
    consultation?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    name: string
    birthDay: Date | string
    sex: string
    cpf: string
    ethnicity: string
    email?: string | null
    observation?: ObservationUncheckedCreateNestedOneWithoutPatientInput
    consultation?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: ObservationUpdateOneWithoutPatientNestedInput
    consultation?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: ObservationUncheckedUpdateOneWithoutPatientNestedInput
    consultation?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    name: string
    birthDay: Date | string
    sex: string
    cpf: string
    ethnicity: string
    email?: string | null
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ObservationCreateInput = {
    id?: string
    comorbidity: string
    allergies: string
    medications: string
    patient: PatientCreateNestedOneWithoutObservationInput
  }

  export type ObservationUncheckedCreateInput = {
    id?: string
    comorbidity: string
    allergies: string
    medications: string
    patientId: string
  }

  export type ObservationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comorbidity?: StringFieldUpdateOperationsInput | string
    allergies?: StringFieldUpdateOperationsInput | string
    medications?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutObservationNestedInput
  }

  export type ObservationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comorbidity?: StringFieldUpdateOperationsInput | string
    allergies?: StringFieldUpdateOperationsInput | string
    medications?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type ObservationCreateManyInput = {
    id?: string
    comorbidity: string
    allergies: string
    medications: string
    patientId: string
  }

  export type ObservationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comorbidity?: StringFieldUpdateOperationsInput | string
    allergies?: StringFieldUpdateOperationsInput | string
    medications?: StringFieldUpdateOperationsInput | string
  }

  export type ObservationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    comorbidity?: StringFieldUpdateOperationsInput | string
    allergies?: StringFieldUpdateOperationsInput | string
    medications?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type ConsultationCreateInput = {
    id?: string
    date: Date | string
    followUp: boolean
    Report?: ReportCreateNestedOneWithoutConsultationInput
    medic: MedicCreateNestedOneWithoutConsultationInput
    patient: PatientCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateInput = {
    id?: string
    date: Date | string
    followUp: boolean
    medicId: string
    patientId: string
    Report?: ReportUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    Report?: ReportUpdateOneWithoutConsultationNestedInput
    medic?: MedicUpdateOneRequiredWithoutConsultationNestedInput
    patient?: PatientUpdateOneRequiredWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    medicId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    Report?: ReportUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationCreateManyInput = {
    id?: string
    date: Date | string
    followUp: boolean
    medicId: string
    patientId: string
  }

  export type ConsultationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ConsultationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    medicId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateInput = {
    id?: string
    description: string
    diagnosis: string
    prescription: string
    consultation: ConsultationCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    description: string
    diagnosis: string
    prescription: string
    consultationId: string
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    prescription?: StringFieldUpdateOperationsInput | string
    consultation?: ConsultationUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    prescription?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateManyInput = {
    id?: string
    description: string
    diagnosis: string
    prescription: string
    consultationId: string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    prescription?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    prescription?: StringFieldUpdateOperationsInput | string
    consultationId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type SecretaryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type SecretaryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type SecretaryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type ConsultationListRelationFilter = {
    every?: ConsultationWhereInput
    some?: ConsultationWhereInput
    none?: ConsultationWhereInput
  }

  export type ConsultationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    specialty?: SortOrder
  }

  export type MedicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    specialty?: SortOrder
  }

  export type MedicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    specialty?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ObservationNullableScalarRelationFilter = {
    is?: ObservationWhereInput | null
    isNot?: ObservationWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDay?: SortOrder
    sex?: SortOrder
    cpf?: SortOrder
    ethnicity?: SortOrder
    email?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDay?: SortOrder
    sex?: SortOrder
    cpf?: SortOrder
    ethnicity?: SortOrder
    email?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDay?: SortOrder
    sex?: SortOrder
    cpf?: SortOrder
    ethnicity?: SortOrder
    email?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type ObservationCountOrderByAggregateInput = {
    id?: SortOrder
    comorbidity?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    patientId?: SortOrder
  }

  export type ObservationMaxOrderByAggregateInput = {
    id?: SortOrder
    comorbidity?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    patientId?: SortOrder
  }

  export type ObservationMinOrderByAggregateInput = {
    id?: SortOrder
    comorbidity?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    patientId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ReportNullableScalarRelationFilter = {
    is?: ReportWhereInput | null
    isNot?: ReportWhereInput | null
  }

  export type MedicScalarRelationFilter = {
    is?: MedicWhereInput
    isNot?: MedicWhereInput
  }

  export type ConsultationCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    medicId?: SortOrder
    patientId?: SortOrder
  }

  export type ConsultationMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    medicId?: SortOrder
    patientId?: SortOrder
  }

  export type ConsultationMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    followUp?: SortOrder
    medicId?: SortOrder
    patientId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ConsultationScalarRelationFilter = {
    is?: ConsultationWhereInput
    isNot?: ConsultationWhereInput
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    diagnosis?: SortOrder
    prescription?: SortOrder
    consultationId?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    diagnosis?: SortOrder
    prescription?: SortOrder
    consultationId?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    diagnosis?: SortOrder
    prescription?: SortOrder
    consultationId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ConsultationCreateNestedManyWithoutMedicInput = {
    create?: XOR<ConsultationCreateWithoutMedicInput, ConsultationUncheckedCreateWithoutMedicInput> | ConsultationCreateWithoutMedicInput[] | ConsultationUncheckedCreateWithoutMedicInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedicInput | ConsultationCreateOrConnectWithoutMedicInput[]
    createMany?: ConsultationCreateManyMedicInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutMedicInput = {
    create?: XOR<ConsultationCreateWithoutMedicInput, ConsultationUncheckedCreateWithoutMedicInput> | ConsultationCreateWithoutMedicInput[] | ConsultationUncheckedCreateWithoutMedicInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedicInput | ConsultationCreateOrConnectWithoutMedicInput[]
    createMany?: ConsultationCreateManyMedicInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type ConsultationUpdateManyWithoutMedicNestedInput = {
    create?: XOR<ConsultationCreateWithoutMedicInput, ConsultationUncheckedCreateWithoutMedicInput> | ConsultationCreateWithoutMedicInput[] | ConsultationUncheckedCreateWithoutMedicInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedicInput | ConsultationCreateOrConnectWithoutMedicInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutMedicInput | ConsultationUpsertWithWhereUniqueWithoutMedicInput[]
    createMany?: ConsultationCreateManyMedicInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutMedicInput | ConsultationUpdateWithWhereUniqueWithoutMedicInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutMedicInput | ConsultationUpdateManyWithWhereWithoutMedicInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutMedicNestedInput = {
    create?: XOR<ConsultationCreateWithoutMedicInput, ConsultationUncheckedCreateWithoutMedicInput> | ConsultationCreateWithoutMedicInput[] | ConsultationUncheckedCreateWithoutMedicInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutMedicInput | ConsultationCreateOrConnectWithoutMedicInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutMedicInput | ConsultationUpsertWithWhereUniqueWithoutMedicInput[]
    createMany?: ConsultationCreateManyMedicInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutMedicInput | ConsultationUpdateWithWhereUniqueWithoutMedicInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutMedicInput | ConsultationUpdateManyWithWhereWithoutMedicInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type ObservationCreateNestedOneWithoutPatientInput = {
    create?: XOR<ObservationCreateWithoutPatientInput, ObservationUncheckedCreateWithoutPatientInput>
    connectOrCreate?: ObservationCreateOrConnectWithoutPatientInput
    connect?: ObservationWhereUniqueInput
  }

  export type ConsultationCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type ObservationUncheckedCreateNestedOneWithoutPatientInput = {
    create?: XOR<ObservationCreateWithoutPatientInput, ObservationUncheckedCreateWithoutPatientInput>
    connectOrCreate?: ObservationCreateOrConnectWithoutPatientInput
    connect?: ObservationWhereUniqueInput
  }

  export type ConsultationUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ObservationUpdateOneWithoutPatientNestedInput = {
    create?: XOR<ObservationCreateWithoutPatientInput, ObservationUncheckedCreateWithoutPatientInput>
    connectOrCreate?: ObservationCreateOrConnectWithoutPatientInput
    upsert?: ObservationUpsertWithoutPatientInput
    disconnect?: ObservationWhereInput | boolean
    delete?: ObservationWhereInput | boolean
    connect?: ObservationWhereUniqueInput
    update?: XOR<XOR<ObservationUpdateToOneWithWhereWithoutPatientInput, ObservationUpdateWithoutPatientInput>, ObservationUncheckedUpdateWithoutPatientInput>
  }

  export type ConsultationUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type ObservationUncheckedUpdateOneWithoutPatientNestedInput = {
    create?: XOR<ObservationCreateWithoutPatientInput, ObservationUncheckedCreateWithoutPatientInput>
    connectOrCreate?: ObservationCreateOrConnectWithoutPatientInput
    upsert?: ObservationUpsertWithoutPatientInput
    disconnect?: ObservationWhereInput | boolean
    delete?: ObservationWhereInput | boolean
    connect?: ObservationWhereUniqueInput
    update?: XOR<XOR<ObservationUpdateToOneWithWhereWithoutPatientInput, ObservationUpdateWithoutPatientInput>, ObservationUncheckedUpdateWithoutPatientInput>
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput> | ConsultationCreateWithoutPatientInput[] | ConsultationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutPatientInput | ConsultationCreateOrConnectWithoutPatientInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutPatientInput | ConsultationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsultationCreateManyPatientInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutPatientInput | ConsultationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutPatientInput | ConsultationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutObservationInput = {
    create?: XOR<PatientCreateWithoutObservationInput, PatientUncheckedCreateWithoutObservationInput>
    connectOrCreate?: PatientCreateOrConnectWithoutObservationInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutObservationNestedInput = {
    create?: XOR<PatientCreateWithoutObservationInput, PatientUncheckedCreateWithoutObservationInput>
    connectOrCreate?: PatientCreateOrConnectWithoutObservationInput
    upsert?: PatientUpsertWithoutObservationInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutObservationInput, PatientUpdateWithoutObservationInput>, PatientUncheckedUpdateWithoutObservationInput>
  }

  export type ReportCreateNestedOneWithoutConsultationInput = {
    create?: XOR<ReportCreateWithoutConsultationInput, ReportUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReportCreateOrConnectWithoutConsultationInput
    connect?: ReportWhereUniqueInput
  }

  export type MedicCreateNestedOneWithoutConsultationInput = {
    create?: XOR<MedicCreateWithoutConsultationInput, MedicUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: MedicCreateOrConnectWithoutConsultationInput
    connect?: MedicWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutConsultationInput = {
    create?: XOR<PatientCreateWithoutConsultationInput, PatientUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationInput
    connect?: PatientWhereUniqueInput
  }

  export type ReportUncheckedCreateNestedOneWithoutConsultationInput = {
    create?: XOR<ReportCreateWithoutConsultationInput, ReportUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReportCreateOrConnectWithoutConsultationInput
    connect?: ReportWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ReportUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<ReportCreateWithoutConsultationInput, ReportUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReportCreateOrConnectWithoutConsultationInput
    upsert?: ReportUpsertWithoutConsultationInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutConsultationInput, ReportUpdateWithoutConsultationInput>, ReportUncheckedUpdateWithoutConsultationInput>
  }

  export type MedicUpdateOneRequiredWithoutConsultationNestedInput = {
    create?: XOR<MedicCreateWithoutConsultationInput, MedicUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: MedicCreateOrConnectWithoutConsultationInput
    upsert?: MedicUpsertWithoutConsultationInput
    connect?: MedicWhereUniqueInput
    update?: XOR<XOR<MedicUpdateToOneWithWhereWithoutConsultationInput, MedicUpdateWithoutConsultationInput>, MedicUncheckedUpdateWithoutConsultationInput>
  }

  export type PatientUpdateOneRequiredWithoutConsultationNestedInput = {
    create?: XOR<PatientCreateWithoutConsultationInput, PatientUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsultationInput
    upsert?: PatientUpsertWithoutConsultationInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutConsultationInput, PatientUpdateWithoutConsultationInput>, PatientUncheckedUpdateWithoutConsultationInput>
  }

  export type ReportUncheckedUpdateOneWithoutConsultationNestedInput = {
    create?: XOR<ReportCreateWithoutConsultationInput, ReportUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: ReportCreateOrConnectWithoutConsultationInput
    upsert?: ReportUpsertWithoutConsultationInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutConsultationInput, ReportUpdateWithoutConsultationInput>, ReportUncheckedUpdateWithoutConsultationInput>
  }

  export type ConsultationCreateNestedOneWithoutReportInput = {
    create?: XOR<ConsultationCreateWithoutReportInput, ConsultationUncheckedCreateWithoutReportInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutReportInput
    connect?: ConsultationWhereUniqueInput
  }

  export type ConsultationUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<ConsultationCreateWithoutReportInput, ConsultationUncheckedCreateWithoutReportInput>
    connectOrCreate?: ConsultationCreateOrConnectWithoutReportInput
    upsert?: ConsultationUpsertWithoutReportInput
    connect?: ConsultationWhereUniqueInput
    update?: XOR<XOR<ConsultationUpdateToOneWithWhereWithoutReportInput, ConsultationUpdateWithoutReportInput>, ConsultationUncheckedUpdateWithoutReportInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ConsultationCreateWithoutMedicInput = {
    id?: string
    date: Date | string
    followUp: boolean
    Report?: ReportCreateNestedOneWithoutConsultationInput
    patient: PatientCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutMedicInput = {
    id?: string
    date: Date | string
    followUp: boolean
    patientId: string
    Report?: ReportUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutMedicInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutMedicInput, ConsultationUncheckedCreateWithoutMedicInput>
  }

  export type ConsultationCreateManyMedicInputEnvelope = {
    data: ConsultationCreateManyMedicInput | ConsultationCreateManyMedicInput[]
    skipDuplicates?: boolean
  }

  export type ConsultationUpsertWithWhereUniqueWithoutMedicInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutMedicInput, ConsultationUncheckedUpdateWithoutMedicInput>
    create: XOR<ConsultationCreateWithoutMedicInput, ConsultationUncheckedCreateWithoutMedicInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutMedicInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutMedicInput, ConsultationUncheckedUpdateWithoutMedicInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutMedicInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutMedicInput>
  }

  export type ConsultationScalarWhereInput = {
    AND?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    OR?: ConsultationScalarWhereInput[]
    NOT?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    id?: StringFilter<"Consultation"> | string
    date?: DateTimeFilter<"Consultation"> | Date | string
    followUp?: BoolFilter<"Consultation"> | boolean
    medicId?: StringFilter<"Consultation"> | string
    patientId?: StringFilter<"Consultation"> | string
  }

  export type ObservationCreateWithoutPatientInput = {
    id?: string
    comorbidity: string
    allergies: string
    medications: string
  }

  export type ObservationUncheckedCreateWithoutPatientInput = {
    id?: string
    comorbidity: string
    allergies: string
    medications: string
  }

  export type ObservationCreateOrConnectWithoutPatientInput = {
    where: ObservationWhereUniqueInput
    create: XOR<ObservationCreateWithoutPatientInput, ObservationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationCreateWithoutPatientInput = {
    id?: string
    date: Date | string
    followUp: boolean
    Report?: ReportCreateNestedOneWithoutConsultationInput
    medic: MedicCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutPatientInput = {
    id?: string
    date: Date | string
    followUp: boolean
    medicId: string
    Report?: ReportUncheckedCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationCreateOrConnectWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationCreateManyPatientInputEnvelope = {
    data: ConsultationCreateManyPatientInput | ConsultationCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type ObservationUpsertWithoutPatientInput = {
    update: XOR<ObservationUpdateWithoutPatientInput, ObservationUncheckedUpdateWithoutPatientInput>
    create: XOR<ObservationCreateWithoutPatientInput, ObservationUncheckedCreateWithoutPatientInput>
    where?: ObservationWhereInput
  }

  export type ObservationUpdateToOneWithWhereWithoutPatientInput = {
    where?: ObservationWhereInput
    data: XOR<ObservationUpdateWithoutPatientInput, ObservationUncheckedUpdateWithoutPatientInput>
  }

  export type ObservationUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    comorbidity?: StringFieldUpdateOperationsInput | string
    allergies?: StringFieldUpdateOperationsInput | string
    medications?: StringFieldUpdateOperationsInput | string
  }

  export type ObservationUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    comorbidity?: StringFieldUpdateOperationsInput | string
    allergies?: StringFieldUpdateOperationsInput | string
    medications?: StringFieldUpdateOperationsInput | string
  }

  export type ConsultationUpsertWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
    create: XOR<ConsultationCreateWithoutPatientInput, ConsultationUncheckedCreateWithoutPatientInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutPatientInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutPatientInput, ConsultationUncheckedUpdateWithoutPatientInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutPatientInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientCreateWithoutObservationInput = {
    id?: string
    name: string
    birthDay: Date | string
    sex: string
    cpf: string
    ethnicity: string
    email?: string | null
    consultation?: ConsultationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutObservationInput = {
    id?: string
    name: string
    birthDay: Date | string
    sex: string
    cpf: string
    ethnicity: string
    email?: string | null
    consultation?: ConsultationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutObservationInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutObservationInput, PatientUncheckedCreateWithoutObservationInput>
  }

  export type PatientUpsertWithoutObservationInput = {
    update: XOR<PatientUpdateWithoutObservationInput, PatientUncheckedUpdateWithoutObservationInput>
    create: XOR<PatientCreateWithoutObservationInput, PatientUncheckedCreateWithoutObservationInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutObservationInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutObservationInput, PatientUncheckedUpdateWithoutObservationInput>
  }

  export type PatientUpdateWithoutObservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: ConsultationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutObservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consultation?: ConsultationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type ReportCreateWithoutConsultationInput = {
    id?: string
    description: string
    diagnosis: string
    prescription: string
  }

  export type ReportUncheckedCreateWithoutConsultationInput = {
    id?: string
    description: string
    diagnosis: string
    prescription: string
  }

  export type ReportCreateOrConnectWithoutConsultationInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutConsultationInput, ReportUncheckedCreateWithoutConsultationInput>
  }

  export type MedicCreateWithoutConsultationInput = {
    id?: string
    name: string
    email: string
    password: string
    specialty: string
  }

  export type MedicUncheckedCreateWithoutConsultationInput = {
    id?: string
    name: string
    email: string
    password: string
    specialty: string
  }

  export type MedicCreateOrConnectWithoutConsultationInput = {
    where: MedicWhereUniqueInput
    create: XOR<MedicCreateWithoutConsultationInput, MedicUncheckedCreateWithoutConsultationInput>
  }

  export type PatientCreateWithoutConsultationInput = {
    id?: string
    name: string
    birthDay: Date | string
    sex: string
    cpf: string
    ethnicity: string
    email?: string | null
    observation?: ObservationCreateNestedOneWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutConsultationInput = {
    id?: string
    name: string
    birthDay: Date | string
    sex: string
    cpf: string
    ethnicity: string
    email?: string | null
    observation?: ObservationUncheckedCreateNestedOneWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutConsultationInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutConsultationInput, PatientUncheckedCreateWithoutConsultationInput>
  }

  export type ReportUpsertWithoutConsultationInput = {
    update: XOR<ReportUpdateWithoutConsultationInput, ReportUncheckedUpdateWithoutConsultationInput>
    create: XOR<ReportCreateWithoutConsultationInput, ReportUncheckedCreateWithoutConsultationInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutConsultationInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutConsultationInput, ReportUncheckedUpdateWithoutConsultationInput>
  }

  export type ReportUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    prescription?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    prescription?: StringFieldUpdateOperationsInput | string
  }

  export type MedicUpsertWithoutConsultationInput = {
    update: XOR<MedicUpdateWithoutConsultationInput, MedicUncheckedUpdateWithoutConsultationInput>
    create: XOR<MedicCreateWithoutConsultationInput, MedicUncheckedCreateWithoutConsultationInput>
    where?: MedicWhereInput
  }

  export type MedicUpdateToOneWithWhereWithoutConsultationInput = {
    where?: MedicWhereInput
    data: XOR<MedicUpdateWithoutConsultationInput, MedicUncheckedUpdateWithoutConsultationInput>
  }

  export type MedicUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
  }

  export type MedicUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
  }

  export type PatientUpsertWithoutConsultationInput = {
    update: XOR<PatientUpdateWithoutConsultationInput, PatientUncheckedUpdateWithoutConsultationInput>
    create: XOR<PatientCreateWithoutConsultationInput, PatientUncheckedCreateWithoutConsultationInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutConsultationInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutConsultationInput, PatientUncheckedUpdateWithoutConsultationInput>
  }

  export type PatientUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: ObservationUpdateOneWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutConsultationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDay?: DateTimeFieldUpdateOperationsInput | Date | string
    sex?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    ethnicity?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: ObservationUncheckedUpdateOneWithoutPatientNestedInput
  }

  export type ConsultationCreateWithoutReportInput = {
    id?: string
    date: Date | string
    followUp: boolean
    medic: MedicCreateNestedOneWithoutConsultationInput
    patient: PatientCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateWithoutReportInput = {
    id?: string
    date: Date | string
    followUp: boolean
    medicId: string
    patientId: string
  }

  export type ConsultationCreateOrConnectWithoutReportInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutReportInput, ConsultationUncheckedCreateWithoutReportInput>
  }

  export type ConsultationUpsertWithoutReportInput = {
    update: XOR<ConsultationUpdateWithoutReportInput, ConsultationUncheckedUpdateWithoutReportInput>
    create: XOR<ConsultationCreateWithoutReportInput, ConsultationUncheckedCreateWithoutReportInput>
    where?: ConsultationWhereInput
  }

  export type ConsultationUpdateToOneWithWhereWithoutReportInput = {
    where?: ConsultationWhereInput
    data: XOR<ConsultationUpdateWithoutReportInput, ConsultationUncheckedUpdateWithoutReportInput>
  }

  export type ConsultationUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    medic?: MedicUpdateOneRequiredWithoutConsultationNestedInput
    patient?: PatientUpdateOneRequiredWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    medicId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type ConsultationCreateManyMedicInput = {
    id?: string
    date: Date | string
    followUp: boolean
    patientId: string
  }

  export type ConsultationUpdateWithoutMedicInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    Report?: ReportUpdateOneWithoutConsultationNestedInput
    patient?: PatientUpdateOneRequiredWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutMedicInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    patientId?: StringFieldUpdateOperationsInput | string
    Report?: ReportUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateManyWithoutMedicInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    patientId?: StringFieldUpdateOperationsInput | string
  }

  export type ConsultationCreateManyPatientInput = {
    id?: string
    date: Date | string
    followUp: boolean
    medicId: string
  }

  export type ConsultationUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    Report?: ReportUpdateOneWithoutConsultationNestedInput
    medic?: MedicUpdateOneRequiredWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    medicId?: StringFieldUpdateOperationsInput | string
    Report?: ReportUncheckedUpdateOneWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    followUp?: BoolFieldUpdateOperationsInput | boolean
    medicId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}