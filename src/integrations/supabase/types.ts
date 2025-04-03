export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attribute_comparisons: {
        Row: {
          attribute: string
          category: string | null
          competitors: Json
          created_at: string
          id: string
          updated_at: string
          your_product: number
        }
        Insert: {
          attribute: string
          category?: string | null
          competitors: Json
          created_at?: string
          id?: string
          updated_at?: string
          your_product: number
        }
        Update: {
          attribute?: string
          category?: string | null
          competitors?: Json
          created_at?: string
          id?: string
          updated_at?: string
          your_product?: number
        }
        Relationships: []
      }
      competitors: {
        Row: {
          created_at: string | null
          customer_satisfaction: number | null
          description: string | null
          employees: string | null
          founded: number | null
          funding: string | null
          growth_rate: number | null
          id: string
          locations: string[] | null
          logo: string
          market_share: number | null
          name: string
          price_point: string | null
          strengths: string[] | null
          threat: string | null
          updated_at: string | null
          weaknesses: string[] | null
        }
        Insert: {
          created_at?: string | null
          customer_satisfaction?: number | null
          description?: string | null
          employees?: string | null
          founded?: number | null
          funding?: string | null
          growth_rate?: number | null
          id?: string
          locations?: string[] | null
          logo: string
          market_share?: number | null
          name: string
          price_point?: string | null
          strengths?: string[] | null
          threat?: string | null
          updated_at?: string | null
          weaknesses?: string[] | null
        }
        Update: {
          created_at?: string | null
          customer_satisfaction?: number | null
          description?: string | null
          employees?: string | null
          founded?: number | null
          funding?: string | null
          growth_rate?: number | null
          id?: string
          locations?: string[] | null
          logo?: string
          market_share?: number | null
          name?: string
          price_point?: string | null
          strengths?: string[] | null
          threat?: string | null
          updated_at?: string | null
          weaknesses?: string[] | null
        }
        Relationships: []
      }
      feature_comparisons: {
        Row: {
          category: string | null
          competitors: Json
          created_at: string
          feature: string
          id: string
          updated_at: string
          your_product: boolean
        }
        Insert: {
          category?: string | null
          competitors: Json
          created_at?: string
          feature: string
          id?: string
          updated_at?: string
          your_product: boolean
        }
        Update: {
          category?: string | null
          competitors?: Json
          created_at?: string
          feature?: string
          id?: string
          updated_at?: string
          your_product?: boolean
        }
        Relationships: []
      }
      goals: {
        Row: {
          category: string
          created_at: string
          description: string
          due_date: string
          id: string
          priority: string
          progress: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          due_date: string
          id?: string
          priority: string
          progress?: number
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          due_date?: string
          id?: string
          priority?: string
          progress?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
