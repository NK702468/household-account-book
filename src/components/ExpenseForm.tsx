import styles from "../styles/ExpenseForm.module.css"

type ExpenseFormProps = {
    fixedValue: string
    variableValue: string
    costValue: number
    expenseType: "fixed" | "variable" | null
    onFixedChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onVariableChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onCostChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ExpenseForm({
    fixedValue,
    variableValue,
    costValue,
    expenseType,
    onFixedChange,
    onVariableChange,
    onCostChange,
}: ExpenseFormProps) {
  return (
    <>
    <div className={styles.formGroup}>
        <label>固定費</label>
        <select
          name="fixed"
          onChange={onFixedChange}
          disabled={expenseType === "variable"}
          value={fixedValue}
        >
          <option value="">選んでください</option>
          <option value="家賃">家賃</option>
          <option value="光熱費">光熱費</option>
          <option value="通信費">通信費</option>
          <option value="保険料">保険料</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>変動費</label>
        <input
          type="text"
          onChange={onVariableChange}
          disabled={expenseType === "fixed"}
          value={variableValue}
          placeholder="例: 食費"
        />
      </div>

      <div className={styles.formGroup}>
        <label>金額</label>
        <input
          type="number"
          onChange={onCostChange}
          value={costValue === 0 ? "" : costValue}
          placeholder="金額を入力"
        />
      </div>
    </>
  )
}