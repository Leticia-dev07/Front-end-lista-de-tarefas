import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#4B44CC',
  secondary: '#FF6584',
  background: '#F4F3FF',
  card: '#FFFFFF',
  text: '#2D2D3A',
  textLight: '#8888A0',
  border: '#E0DFFF',
  success: '#4CAF50',
  danger: '#FF5252',
  concluida: '#E8F5E9',
  concluidaText: '#388E3C',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: '#FAFAFE',
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  btnDanger: {
    backgroundColor: COLORS.danger,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
