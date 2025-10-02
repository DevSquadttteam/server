export const getProfit = async (req, res) => {
  try {
    // тестовые данные
    const profit = 12345;
    res.json({ profit });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении прибыли" });
  }
};
